import { createAsyncThunk } from "@reduxjs/toolkit";
import { FirebaseService } from "../../services/firebase/firebase";
import { ChildInfo } from "../../types/interfaces";

export const fetchChildren = createAsyncThunk(
  "children/fetchChildren",
  async () => {
    return await FirebaseService.getAllChildren();
  },
);

export const addChild = createAsyncThunk(
  "children/addChild",
  async (child: Omit<ChildInfo, "id" | "chores">) => {
    const id = await FirebaseService.addChild(child);
    return { ...child, id };
  },
);

export const removeChild = createAsyncThunk(
  "children/removeChild",
  async (childId: string) => {
    await FirebaseService.removeChild(childId);
    return childId;
  },
);

export const resetChildren = createAsyncThunk(
  "children/resetChildren",
  async () => {
    await FirebaseService.getAllChildren(); // Just to maintain async pattern
    return null;
  },
);

export const getTotalPoints = createAsyncThunk(
  "children/getTotalPoints",
  async () => {
    const children = await FirebaseService.getAllChildren();
    const totalPoints = children.reduce(
      (total, child) => total + (child.totalRewardsPoints || 0),
      0,
    );
    return totalPoints;
  },
);
