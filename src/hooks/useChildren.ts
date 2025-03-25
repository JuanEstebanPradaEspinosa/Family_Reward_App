import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import {
  addChild,
  removeChild,
  fetchChildren,
  resetChildren,
  getTotalPoints,
} from "../context/actions/childrenActions";
import { ChildInfo } from "../types/interfaces";
import { auth } from "../services/firebase";
import { Alert } from "react-native";

export const useChildren = () => {
  const dispatch = useDispatch<AppDispatch>(); 
  const { children, loading, error, totalRewardsPoints } = useSelector(
    (state: RootState) => state.children,
  );

  const getChildById = useCallback(
    (id: string) => children.find((child) => child.id === id),
    [children],
  );

  const addNewChild = useCallback(
    // Memoize the function to prevent unnecessary re-renders
    async (child: Omit<ChildInfo, "id" | "chores">) => {
      try {
        if (auth.currentUser?.isAnonymous) {
          throw new Error("Only registered users can add children");
        }
        await dispatch(addChild(child)).unwrap();
        await dispatch(fetchChildren());
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to add child");
        throw error;
      }
    },
    // Only re-run the effect if the dispatch function changes
    [dispatch],
  );

  const removeExistingChild = useCallback(
    async (childId: string) => {
      try {
        if (auth.currentUser?.isAnonymous) {
          throw new Error("Only registered users can remove children");
        }
        await dispatch(removeChild(childId)).unwrap();
        await dispatch(fetchChildren());
      } catch (error: any) {
        Alert.alert("Error", error.message || "Failed to remove a child");
        throw error;
      }
    },
    [dispatch],
  );

  const refreshChildren = useCallback(async () => {
    try {
      await dispatch(fetchChildren());
    } catch (error) {
      console.error("Failed to refresh children:", error);
      throw error;
    }
  }, [dispatch]);

  const resetApp = useCallback(async () => {
    try {
      await dispatch(resetChildren());
      await dispatch(fetchChildren());
    } catch (error) {
      console.error("Failed to reset app:", error);
      throw error;
    }
  }, [dispatch]);

  const updateTotalPoints = useCallback(async () => {
    try {
      await dispatch(getTotalPoints());
    } catch (error) {
      console.error("Failed to get total points:", error);
      throw error;
    }
  }, [dispatch]);

  return {
    children,
    loading,
    error,
    getChildById,
    addNewChild,
    removeExistingChild,
    refreshChildren,
    resetApp,
    updateTotalPoints,
    totalRewardsPoints,
  };
};
