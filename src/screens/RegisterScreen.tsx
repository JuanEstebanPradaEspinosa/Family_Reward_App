import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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

const RegisterScreen: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const { register, loading } = useAuth();
  const navigation = useNavigation<StackNavigationProp<AuthStackParamList>>();

  const handleRegister = async () => {
    if (!name || !email || !password || !repeatPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== repeatPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      await register(email, password, name);
      Alert.alert("Success", "Registration successful!", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Login"),
        },
      ]);
    } catch (error: any) {
      Alert.alert("Registration Failed", error.message);
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
      <Text style={styles.subtitle}>Create Account</Text>

      <Card>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="person" size={24} color="#2c3e50" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
            />
          </View>

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

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock-outline" size={24} color="#2c3e50" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={repeatPassword}
              onChangeText={setRepeatPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleRegister}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.loginButtonText}>
              Already have an account? Login
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
    alignItems: "center",
    width: "100%",
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
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    marginLeft: 10,
  },
  registerButton: {
    backgroundColor: "#3498db",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginVertical: 10,
    width: "100%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Fuzzy-Bubbles-bold",
  },
  loginButton: {
    marginTop: 20,
    alignItems: "center",
  },
  loginButtonText: {
    color: "#3498db",
    fontSize: 16,
    fontFamily: "Fuzzy-Bubbles-regular",
  },
});

export default RegisterScreen;

//TODO: Make use of gloablStyles for the styles in this file
//TODO: Make use of Formik and Yup for form validation
