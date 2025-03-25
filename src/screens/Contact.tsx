import { StyleSheet, Text, View, Image, Linking } from "react-native";
import React from "react";
import Card from "./shared/Card";
import { globalStyles } from "../styles/global";

const Contact = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Development Team</Text>

      <Card>
        <View style={styles.teamMember}>
          <Image
            source={require("../../assets/images/boy.png")}
            style={styles.avatar}
          />
          <View style={styles.info}>
            <Text style={styles.name}>Juan Prada</Text>
            <Text style={styles.role}>Lead Developer</Text>
            <Text
              style={styles.email}
              onPress={() => Linking.openURL("mailto:juan.prada@example.com")}
            >
              juan.prada@example.com
            </Text>
          </View>
        </View>
      </Card>

      <View style={styles.contactInfo}>
        <Text style={styles.sectionTitle}>Get in Touch</Text>
        <Text style={styles.contactText}>
          Have questions or suggestions? We'd love to hear from you!
        </Text>
        <Text style={styles.contactDetail}>
          Email: support@familyrewards.com
        </Text>
        <Text style={styles.contactDetail}>
          GitHub: github.com/family-rewards
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    margin: 20,
    backgroundColor: "#fff",
  },
  title: {
    ...globalStyles.title,
    marginBottom: 20,
    textAlign: "center",
  },
  teamMember: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  info: {
    flex: 1,
  },
  name: {
    ...globalStyles.subTitle,
    fontSize: 18,
    marginBottom: 5,
  },
  role: {
    ...globalStyles.detail,
    marginBottom: 5,
  },
  email: {
    ...globalStyles.subDetail,
    color: "#2196F3",
    textDecorationLine: "underline",
  },
  contactInfo: {
    marginTop: 30,
    padding: 20,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  sectionTitle: {
    ...globalStyles.subTitle,
    marginTop: 0,
    marginBottom: 10,
  },
  contactText: {
    ...globalStyles.text,
    marginBottom: 15,
  },
  contactDetail: {
    ...globalStyles.detail,
    marginBottom: 5,
  },
});

export default Contact;
