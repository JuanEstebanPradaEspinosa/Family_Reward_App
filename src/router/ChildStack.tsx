import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AllChildren from "../screens/AllChildren";
import ChildDetails from "../screens/ChildDetails";
import { ChildStackParamList } from "../types/navigations";

const Stack = createStackNavigator<ChildStackParamList>();

const ChildStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Children">
      <Stack.Screen name="Children" component={AllChildren} />
      <Stack.Screen name="Details" component={ChildDetails} />
    </Stack.Navigator>
  );
};

export default ChildStack;
