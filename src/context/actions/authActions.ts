import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import { SerializableUser } from "../../types/interfaces";

export const loginUser = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    } as SerializableUser;
  },
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }: { email: string; password: string }) => {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
    } as SerializableUser;
  },
);
