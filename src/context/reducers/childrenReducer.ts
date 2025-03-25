import { createSlice } from "@reduxjs/toolkit";
import { ChildInfo, ChildrenState } from "../../types/interfaces";
import {
  fetchChildren,
  addChild,
  removeChild,
  resetChildren,
  getTotalPoints,
} from "../actions/childrenActions";
import { toggleChore } from "../actions/choreActions";

const initialState: ChildrenState = {
  children: [],
  totalRewardsPoints: 0,
  loading: false,
  error: null,
};

const childrenSlice = createSlice({
  name: "children",
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchChildren.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchChildren.fulfilled, (state, action) => {
        state.children = action.payload.map((child: any) => ({
          ...child,
          name: child.name || "",
          age: child.age || 0,
          gender: child.gender || "",
          notes: child.notes || "",
          chores: child.chores || [],
          totalRewardsPoints: child.totalRewardsPoints || 0,
        }));
        state.loading = false;
      })
      .addCase(fetchChildren.rejected, (state, action) => {
        state.error = action.error.message ?? null;
        state.loading = false;
      })
      .addCase(addChild.fulfilled, (state, action) => {
        state.children.push({
          ...action.payload,
          id: action.payload.id.toString(),
          chores: [],
          totalRewardsPoints: 0,
        });
      })
      .addCase(toggleChore.fulfilled, (state, action) => {
        // Let Firebase handle the toggle and points calculation
      })
      .addCase(removeChild.fulfilled, (state, action) => {
        state.children = state.children.filter(
          (child) => child.id !== action.payload.toString(),
        );
      })
      .addCase(resetChildren.fulfilled, (state) => {
        state.children = [];
        state.totalRewardsPoints = 0;
        state.loading = false;
        state.error = null;
      })
      .addCase(getTotalPoints.fulfilled, (state, action) => {
        state.totalRewardsPoints = action.payload;
      });
  },
});

export default childrenSlice.reducer;

function calculateTotalPoints(children: ChildInfo[]): number {
  return children.reduce((total, child) => {
    return total + (child.totalRewardsPoints || 0);
  }, 0);
}
