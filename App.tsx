import "./gesture-handler";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { onSnapshot, collection } from "firebase/firestore";
import { db, auth } from "./src/services/firebase";
import { fetchChildren } from "./src/context/actions/childrenActions";
import DrawerNav from "./src/router/DrawerNav";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import { useSelector } from "react-redux";
import { RootState } from "./src/context/store";
import AuthStack from "./src/router/AuthStack";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/context/store";
import { setUser } from "./src/context/reducers/authReducer";

SplashScreen.preventAutoHideAsync();

function Main() {
  const [loaded, error] = useFonts({
    "Fuzzy-Bubbles-regular": require("./assets/fonts/Fuzzy Bubbles Regular.ttf"),
    "Fuzzy-Bubbles-bold": require("./assets/fonts/Fuzzy Bubbles Bold.ttf"),
  });

  // Handle splashScreen loading
  React.useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  // Get user from Redux store
  const { user, loading } = useSelector((state: RootState) => state.auth);

  // Firebase listener setup - Children
  React.useEffect(() => {
    // Listen for changes to the children collection - handle updates
    const unsubscribe = onSnapshot(
      collection(db, "children"),
      async (snapshot) => {
        // This callback runs every time the data changes
        if (!snapshot.metadata.hasPendingWrites) {
          await store.dispatch(fetchChildren());
        }
      },
    );
    // Unsubscribe when component unmounts
    return () => unsubscribe(); // stop listening for updates
  }, []);

  // Firebase listener setup Auth user
  React.useEffect(() => {
    const unsubAuthState = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // User is signed in
        store.dispatch(
          setUser({
            uid: user.uid,
            email: user.email,
            emailVerified: user.emailVerified,
            isAnonymous: user.isAnonymous,
            displayName: user.displayName || "Unknown User",
          }),
        );
      } else {
        // User is signed out
        store.dispatch(setUser(null));
      }
    });

    return () => unsubAuthState();
  }, []);

  // If fonts are not loaded, don't render anything
  if (!loaded && !error) {
    return null;
  }
  // If fonts are loaded, but user is not yet determined, don't render anything
  if (loading) return null;

  return (
    <NavigationContainer>
      {/* NavigationContainer to wrap all navigators */}
      {user ? <DrawerNav /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      {/* Redux store provider to all child components */}
      <PersistGate loading={null} persistor={persistor}>
        {/* PersistGate to persist the Redux store */}
        <Main />
      </PersistGate>
    </Provider>
  );
}
