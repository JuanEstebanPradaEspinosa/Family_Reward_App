import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { useAuth } from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../types/navigations";
import { globalStyles } from "../styles/global";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./shared/Card";
import LoadingSpinner from "./shared/LoadingSpinner";

type LoginScreenNavigationProp = StackNavigationProp<
  AuthStackParamList,
  "Login"
>;

const LoginScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, signInAnonym, loading, error } = useAuth();
  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    try {
      await login(email, password);
    } catch (error: any) {
      Alert.alert("Login Failed", error.message);
      // Clear form fields
      setEmail("");
      setPassword("");
    }
  };

  const handleAnonymousLogin = async () => {
    try {
      await signInAnonym();
    } catch (error: any) {
      Alert.alert("Anonymous Login Failed", error.message);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/family.png")}
        style={styles.logo}
      />
      <Text style={styles.title}>Family Rewards</Text>
      <Text style={styles.subtitle}>Welcome Back!</Text>

      <Card>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={24} color="#2c3e50" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={24} color="#2c3e50" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.anonymousButton}
            onPress={handleAnonymousLogin}
          >
            <MaterialIcons name="person-outline" size={24} color="white" />
            <Text style={styles.anonymousButtonText}>Continue as Guest</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={styles.registerButtonText}>
              Don't have an account? Register
            </Text>
          </TouchableOpacity>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  centered: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 40,
  },
  title: {
    ...globalStyles.title,
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    ...globalStyles.subTitle,
    textAlign: "center",
    marginBottom: 30,
  },
  form: {
    padding: 20,
    alignItems: "center", // Center all content
    width: "100%", // Take full width of card
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#f5f6fa",
    width: "100%", // Take full width of form
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    marginLeft: 10,
  },
  loginButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "100%", // Take full width of form
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Fuzzy-Bubbles-bold",
  },
  anonymousButton: {
    backgroundColor: "#95a5a6",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%", // Take full width of form
  },
  anonymousButtonText: {
    color: "#fff",
    fontSize: 16,
    marginLeft: 10,
    fontFamily: "Fuzzy-Bubbles-regular",
  },
  registerButton: {
    marginTop: 20,
    alignItems: "center",
  },
  registerButtonText: {
    color: "#3498db",
    fontSize: 16,
    fontFamily: "Fuzzy-Bubbles-regular",
  },
});

export default LoginScreen;

//TODO: Make use of gloablStyles for the styles in this file
//TODO: Make use of Formik and Yup for form validation
