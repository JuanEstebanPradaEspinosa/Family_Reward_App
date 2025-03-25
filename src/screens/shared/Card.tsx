import React from "react";
import { View, StyleSheet } from "react-native";
import { COLORS, SPACING, SHADOWS } from "../../styles/theme";

interface CardProps {
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={styles.card}>
      <View style={styles.context}>{props.children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: SPACING.md,
    marginVertical: SPACING.sm,
    marginHorizontal: SPACING.sm,
    ...SHADOWS.small,
  },
  context: {
    minWidth: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});

export default Card;
