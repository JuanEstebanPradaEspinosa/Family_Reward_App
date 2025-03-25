import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ChoreInfo } from "../types/interfaces";
import {
  addChore,
  removeChore,
  toggleChore,
  fetchChores,
} from "../context/actions/choreActions";
import { fetchChildren } from "../context/actions/childrenActions";
import { AppDispatch, RootState } from "../context/store";
import { auth } from "../services/firebase";
import { Alert } from "react-native";

export const useChores = (childId: string) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, chores } = useSelector(
    (state: RootState) => state.chores,
  );

  const getChores = useCallback(async () => {
    try {
      await dispatch(fetchChores(childId)).unwrap();
    } catch (error) {
      console.error("Failed to get chores:", error);
      throw error;
    }
  }, [dispatch, childId]);

  const addNewChore = useCallback(
    async (chore: Omit<ChoreInfo, "id">) => {
      try {
        if (auth.currentUser?.isAnonymous) {
          throw new Error("Only registered users can add chores");
        }
        await dispatch(addChore({ childId, chore })).unwrap();
        await dispatch(fetchChildren());
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to add chore");
        throw error;
      }
    },
    [dispatch, childId],
  );

  const removeExistingChore = useCallback(
    async (choreId: string) => {
      try {
        if (auth.currentUser?.isAnonymous) {
          throw new Error("Only registered users can remove chores");
        }
        await dispatch(removeChore({ childId, choreId })).unwrap();
        await dispatch(fetchChildren());
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to remove chore");
        throw error;
      }
    },
    [dispatch, childId],
  );

  const toggleChoreStatus = useCallback(
    async (choreId: string) => {
      try {
        if (auth.currentUser?.isAnonymous) {
          throw new Error("Only registered users can toggle chore status");
        }
        await dispatch(toggleChore({ childId, choreId })).unwrap();
        await dispatch(fetchChildren());
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to toggle chore status");
        throw error;
      }
    },
    [dispatch, childId],
  );

  return {
    chores,
    loading,
    error,
    addNewChore,
    removeExistingChore,
    toggleChoreStatus,
    getChores,
  };
};
