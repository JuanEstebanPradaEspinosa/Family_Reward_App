import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { globalStyles } from "../styles/global";
import { useAuth } from "../hooks/useAuth";
import Card from "./shared/Card";
import { MaterialIcons } from "@expo/vector-icons";

const ProfileScreen: React.FC = () => {
  const { user, logout, isAnonymous } = useAuth();

  const handleLogout = async () => {
    Alert.alert("Logout", "Are you sure you want to logout?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Logout",
        onPress: async () => {
          try {
            await logout();
          } catch (error) {
            Alert.alert("Error", "Failed to logout");
          }
        },
        style: "destructive",
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            isAnonymous
              ? require("../../assets/images/anonymous.png")
              : require("../../assets/images/children.png")
          }
          style={styles.profileImage}
        />
        <Text style={styles.title}>
          {user?.displayName || "Anonymous User"}
        </Text>
      </View>

      <Card>
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="email" size={24} color="#2c3e50" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Email</Text>
              <Text style={styles.value}>{user?.email || "Not Available"}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="verified-user" size={24} color="#2c3e50" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>
                {isAnonymous ? "Anonymous User" : "Registered User"}
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="check-circle" size={24} color="#2c3e50" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.label}>Verified</Text>
              <Text style={styles.value}>
                {user?.emailVerified ? "Yes" : "No"}
              </Text>
            </View>
          </View>
        </View>
      </Card>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 5,
  },
  infoContainer: {
    padding: 15,
    width: "100%",
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  iconContainer: {
    width: 40,
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
  },
  label: {
    ...globalStyles.subTitle,
    marginBottom: 5,
    fontSize: 14,
    color: "#7f8c8d",
  },
  value: {
    ...globalStyles.text,
    fontSize: 16,
    color: "#2c3e50",
  },
  logoutButton: {
    backgroundColor: "#FF4040",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
  },
  logoutText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});

export default ProfileScreen;

//TODO: Make use of gloablStyles for the styles in this file