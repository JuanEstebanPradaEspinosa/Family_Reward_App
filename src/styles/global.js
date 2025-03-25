import { StyleSheet } from "react-native";
import { COLORS, SIZES, FONTS, SPACING, SHADOWS } from "./theme";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  childImage: {
    width: 100,
    height: 100,
    borderRadius: 40,
    marginHorizontal: SPACING.md,
    marginVertical: SPACING.md,
  },
  choreImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: SPACING.sm,
    marginVertical: SPACING.sm,
  },
  Info: {
    marginHorizontal: SPACING.xs,
  },
  title: {
    ...FONTS.bold,
    fontSize: SIZES.large,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  subTitle: {
    ...FONTS.bold,
    fontSize: SIZES.xmedium,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
    marginTop: SPACING.md,
  },
  subSubTitle: {
    ...FONTS.bold,
    fontSize: SIZES.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  text: {
    ...FONTS.regular,
    fontSize: SIZES.medium,
    color: COLORS.text.primary,
    marginBottom: SPACING.sm,
  },
  detail: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.text.secondary,
    marginBottom: SPACING.sm,
  },
  subDetail: {
    ...FONTS.regular,
    fontSize: SIZES.small,
    color: COLORS.text.light,
    marginBottom: SPACING.xs,
  },
  addButton: {
    width: 80,
    height: 80,
    alignSelf: "center",
    padding: SPACING.lg,
    margin: 50,
  },
  form: {
    backgroundColor: COLORS.background,
    borderRadius: 10,
    padding: SPACING.lg,
    ...SHADOWS.medium,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    padding: SPACING.md,
    fontSize: SIZES.medium,
    borderRadius: 10,
    marginBottom: SPACING.sm,
    backgroundColor: "#f9f9f9",
  },
});
