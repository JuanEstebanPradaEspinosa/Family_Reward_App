import { StyleSheet, View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingSpinner = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
  );
};

export default LoadingSpinner;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
