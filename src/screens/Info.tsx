import { StyleSheet, Text, View, Image } from "react-native";
import { globalStyles } from "../styles/global";
import React from "react";

const Info = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/family.png")}
        style={styles.logo}
      />
      <Text style={globalStyles.title}>Family Rewards</Text>
      <Text style={styles.version}>Version 1.0.0</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          Family Rewards is an app designed to help parents manage and track
          their children's chores and rewards. Encourage positive behavior and
          responsibility while making household tasks fun and rewarding.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <View style={styles.featureList}>
          <Text style={styles.feature}>• Manage children's profiles</Text>
          <Text style={styles.feature}>• Create and assign chores</Text>
          <Text style={styles.feature}>• Track completion status</Text>
          <Text style={styles.feature}>• Award points for completed tasks</Text>
        </View>
      </View>
    </View>
  );
};

export default Info;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    alignItems: "center",
    margin: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  version: {
    ...globalStyles.detail,
    marginBottom: 14,
  },
  section: {
    width: "100%",
    marginBottom: 25,
  },
  sectionTitle: {
    ...globalStyles.subTitle,
    marginBottom: 10,
  },
  description: {
    ...globalStyles.text,
    marginBottom: 0,
    lineHeight: 24,
    textAlign: "center",
  },
  featureList: {
    alignItems: "flex-start",
    width: "100%",
  },
  feature: {
    ...globalStyles.text,
    marginBottom: 8,
    lineHeight: 24,
  },
});
