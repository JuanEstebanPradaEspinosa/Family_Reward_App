import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../context/store";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
  signInAnonymously,
  deleteUser,
} from "firebase/auth";
import { auth } from "../services/firebase";
import { setUser, setLoading, setError } from "../context/reducers/authReducer";

export const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth,
  );

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        dispatch(setLoading(true));
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password,
        );
        console.log(userCredential);
        dispatch(
          setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            emailVerified: userCredential.user.emailVerified,
            isAnonymous: userCredential.user.isAnonymous,
            displayName: userCredential.user.displayName,
          }),
        );
      } catch (error: any) {
        dispatch(setError(error.message));
        throw error;
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch],
  );

  const register = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        dispatch(setLoading(true));
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password,
        );
        await updateProfile(userCredential.user, { displayName: displayName });
        dispatch(
          setUser({
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            emailVerified: userCredential.user.emailVerified,
            isAnonymous: userCredential.user.isAnonymous,
            displayName: displayName,
          }),
        );
      } catch (error: any) {
        dispatch(setError(error.message));
        throw error;
      }
    },
    [dispatch],
  );

  const signInAnonym = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const userCredential = await signInAnonymously(auth);
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: null,
          emailVerified: false,
          isAnonymous: true,
          displayName: "Anonymous User",
        }),
      );
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  }, [dispatch]);

  const logout = useCallback(async () => {
    try {
      // Delete anonymous user if exists if not just an logout
      const currentUser = auth.currentUser;
      const isAnonymous = currentUser?.isAnonymous;

      await signOut(auth);

      if (isAnonymous) {
        await deleteUser(currentUser!);
      }

      dispatch(setUser(null));
    } catch (error: any) {
      dispatch(setError(error.message));
      throw error;
    }
  }, [dispatch]);

  const updateUserProfile = useCallback(
    async (displayName: string) => {
      try {
        if (auth.currentUser) {
          await updateProfile(auth.currentUser, { displayName });
          dispatch(
            setUser({
              ...user!,
              displayName,
            }),
          );
        }
      } catch (error: any) {
        dispatch(setError(error.message));
        throw error;
      }
    },
    [dispatch, user],
  );

  return {
    user,
    loading,
    error,
    login,
    register,
    logout,
    signInAnonym,
    updateUserProfile,
    isAuthenticated: !!user,
    isAnonymous: user?.isAnonymous || false,
  };
};
