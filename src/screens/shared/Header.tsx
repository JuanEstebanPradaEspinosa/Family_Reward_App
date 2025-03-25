import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { FONTS } from "../../styles/theme";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../types/navigations";
import { Alert } from "react-native";
import { useChildren } from "../../hooks/useChildren";

type HeaderProps = {
  navigation: DrawerNavigationProp<RootDrawerParamList>;
};

const Header: React.FC<HeaderProps> = ({ navigation }) => {
  const { updateTotalPoints, resetApp, children, totalRewardsPoints } =
    useChildren();

  // Update total points when children state changes
  React.useEffect(() => {
    const fetchPoints = async () => {
      await updateTotalPoints();
    };
    fetchPoints();
  }, [children]); // Re-run when children state changes

  const openMenu = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleReset = () => {
    Alert.alert(
      "Reset Data",
      "Are you sure you want to reset all children and chores? This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: () => resetApp(),
        },
      ],
    );
  };

  return (
    <View style={styles.header}>
      <MaterialIcons
        name="menu"
        size={42}
        onPress={openMenu}
        style={styles.icon}
      />
      <View style={styles.titleContainer}>
        <Text style={styles.headerText}>Family Rewards</Text>
        <Image
          source={require("../../../assets/images/family.png")}
          style={styles.headerImage}
        />
      </View>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsText}>{totalRewardsPoints}</Text>
        <MaterialIcons name="star" size={36} color="#FFD700" />
      </View>
      <TouchableOpacity onPress={handleReset} style={styles.resetButton}>
        <MaterialIcons name="refresh" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 110,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#fff",
    marginTop: 20,
    paddingLeft: 20,
    paddingRight: 10,
    elevation: 4, // Add shadow for Android
    shadowColor: "#000", // Add shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  pointsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 5,
  },
  pointsText: {
    ...FONTS.bold,
    fontSize: 20,
    marginRight: 5,
  },
  resetButton: {
    marginRight: 10,
  },
  headerText: {
    ...FONTS.bold,
    fontSize: 28,
    letterSpacing: 1,
  },
  headerImage: {
    width: 48,
    height: 48,
    marginLeft: 15,
  },
  icon: {
    marginRight: 10,
  },
});
