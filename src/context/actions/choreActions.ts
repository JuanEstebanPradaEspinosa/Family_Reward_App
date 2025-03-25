import { createAsyncThunk } from "@reduxjs/toolkit";
import { ChoreInfo } from "../../types/interfaces";
import { FirebaseService } from "../../services/firebase/firebase";

export const addChore = createAsyncThunk(
  "chores/addChore",
  async ({
    childId,
    chore,
  }: {
    childId: string;
    chore: Omit<ChoreInfo, "id">;
  }) => {
    try {
      const choreId = await FirebaseService.addChore(childId, chore);
      return { ...chore, id: choreId } as ChoreInfo;
    } catch (error) {
      throw new Error("Failed to add chore");
    }
  },
);

export const fetchChores = createAsyncThunk(
  "chores/fetchChores",
  async (childId: string) => {
    try {
      const chores = await FirebaseService.getChores(childId);
      return chores;
    } catch (error) {
      throw new Error("Failed to fetch chores");
    }
  },
);

export const removeChore = createAsyncThunk(
  "chores/removeChore",
  async ({ childId, choreId }: { childId: string; choreId: string }) => {
    try {
      await FirebaseService.removeChore(childId, choreId);
      return choreId;
    } catch (error) {
      throw new Error("Failed to remove chore");
    }
  },
);

export const toggleChore = createAsyncThunk(
  "chores/toggleChore",
  async ({ childId, choreId }: { childId: string; choreId: string }) => {
    try {
      await FirebaseService.toggleChoreStatus(childId, choreId);
      return { childId, choreId };
    } catch (error) {
      throw new Error("Failed to toggle chore status");
    }
  },
);
