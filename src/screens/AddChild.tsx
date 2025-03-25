import { Button, StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import { Field, Formik } from "formik";
import * as yup from "yup";
import { globalStyles } from "../styles/global";
import { ChildInfo } from "../types/interfaces";

type AddChildFormProps = {
  addChild: (child: Omit<ChildInfo, "id">) => void;
};

const childSchema = yup.object({
  name: yup.string().required().min(4),
  age: yup
    .number()
    .required()
    .min(1, "Age must be at least 1")
    .max(18, "Age must be at most 18"),
  gender: yup
    .string()
    .required()
    .oneOf(["male", "female"], "Gender must be either male or female"),
  notes: yup.string().required().min(8),
});

const AddChild = ({ addChild }: AddChildFormProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/children.png")}
        style={{ width: 200, height: 200, alignSelf: "center" }}
      />
      <Formik
        initialValues={{ name: "", age: "", gender: "", notes: "" }}
        validationSchema={childSchema}
        onSubmit={(values) => {
          console.log(values);
          addChild({
            name: values.name,
            age: parseInt(values.age, 10),
            gender: values.gender as "male" | "female",
            notes: values.notes,
            chores: [],
            totalRewardsPoints: 0,
          });
        }}
      >
        {(props) => (
          <View style={globalStyles.form}>
            <TextInput
              style={globalStyles.input}
              placeholder="Child's name"
              onChangeText={props.handleChange("name")}
              value={props.values.name}
              onBlur={props.handleBlur("name")}
            />
            <Text style={styles.errorText}>
              {props.touched.name && props.errors.name}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Child's age"
              onChangeText={props.handleChange("age")}
              value={props.values.age}
              keyboardType="numeric"
              onBlur={props.handleBlur("age")}
            />
            <Text style={styles.errorText}>
              {props.touched.age && props.errors.age}
            </Text>

            <TextInput
              style={globalStyles.input}
              placeholder="Child's gender (male/female)"
              onChangeText={props.handleChange("gender")}
              value={props.values.gender}
              onBlur={props.handleBlur("gender")}
            />

            <Text style={styles.errorText}>
              {props.touched.gender && props.errors.gender}
            </Text>

            <TextInput
              multiline
              style={[globalStyles.input, styles.textArea]}
              placeholder="Notes"
              onChangeText={props.handleChange("notes")}
              value={props.values.notes}
              onBlur={props.handleBlur("notes")}
            />
            <Text style={styles.errorText}>
              {props.touched.notes && props.errors.notes}
            </Text>
            <Button
              title="Submit"
              color="lightblue"
              onPress={() => props.handleSubmit()}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

export default AddChild;

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
});
