import { createSlice } from "@reduxjs/toolkit";
import { ChoreState } from "../../types/interfaces";
import {
  addChore,
  removeChore,
  toggleChore,
  fetchChores,
} from "../actions/choreActions";

const initialState: ChoreState = {
  chores: [],
  loading: false,
  error: null,
};

const choresSlice = createSlice({
  name: "chores",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addChore.fulfilled, (state, action) => {
        state.chores.push(action.payload);
      })
      .addCase(removeChore.fulfilled, (state, action) => {
        state.chores = state.chores.filter(
          (chore) => chore.id !== action.payload,
        );
      })
      .addCase(toggleChore.fulfilled, (state, action) => {
        const chore = state.chores.find((c) => c.id === action.payload.choreId);
        if (chore) {
          chore.status = chore.status === "pending" ? "completed" : "pending";
        }
      })
      .addCase(fetchChores.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChores.fulfilled, (state, action) => {
        state.chores = action.payload;
        state.loading = false;
      })
      .addCase(fetchChores.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Failed to fetch chores";
      });
  },
});

export default choresSlice.reducer;
