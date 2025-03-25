import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import { ChoreInfo } from "../types/interfaces";

type AddChoreFormProps = {
  addChore: (chore: Omit<ChoreInfo, "id">) => void;
};

const choreSchema = yup.object({
  title: yup.string().required().min(4, "Title must be at least 4 characters"),
  description: yup
    .string()
    .required()
    .min(8, "Description must be at least 8 characters"),
  status: yup
    .string()
    .required()
    .oneOf(
      ["pending", "completed"],
      "Status must be either pending or completed",
    ),
  rewardPoints: yup
    .number()
    .required()
    .min(1, "Points must be at least 1")
    .max(100, "Points must be at most 100"),
});

const AddChore = ({ addChore }: AddChoreFormProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/broom.png")}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      <Formik
        initialValues={{
          title: "",
          description: "",
          status: "pending",
          rewardPoints: "",
        }}
        validationSchema={choreSchema}
        onSubmit={(values) => {
          addChore({
            title: values.title,
            description: values.description,
            status: values.status as "pending" | "completed",
            rewardPoints: parseInt(values.rewardPoints, 10),
          });
        }}
      >
        {(props) => (
          <View style={globalStyles.form}>
            <TextInput
              style={globalStyles.input}
              placeholder="Chore title"
              onChangeText={props.handleChange("title")}
              value={props.values.title}
              onBlur={props.handleBlur("title")}
            />
            <Text style={styles.errorText}>
              {props.touched.title && props.errors.title}
            </Text>

            <TextInput
              multiline
              style={[globalStyles.input, styles.textArea]}
              placeholder="Chore description"
              onChangeText={props.handleChange("description")}
              value={props.values.description}
              onBlur={props.handleBlur("description")}
            />
            <Text style={styles.errorText}>
              {props.touched.description && props.errors.description}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Status (pending/completed)"
              onChangeText={props.handleChange("status")}
              value={props.values.status}
              onBlur={props.handleBlur("status")}
            />
            <Text style={styles.errorText}>
              {props.touched.status && props.errors.status}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Reward points"
              onChangeText={props.handleChange("rewardPoints")}
              value={props.values.rewardPoints}
              keyboardType="numeric"
              onBlur={props.handleBlur("rewardPoints")}
            />
            <Text style={styles.errorText}>
              {props.touched.rewardPoints && props.errors.rewardPoints}
            </Text>

            <Button
              title="Add Chore"
              color="lightblue"
              onPress={() => props.handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddChore;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  textArea: {
    height: 100,
  },
  errorText: {
    color: "red",
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  image: {
    width: 250,
    height: 250,
    alignSelf: "center",
  },
});
