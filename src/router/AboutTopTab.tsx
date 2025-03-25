import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { AboutTabParamList } from "../types/navigations.js";
import Info from "../screens/Info";
import Contact from "../screens/Contact";

const Tab = createMaterialTopTabNavigator<AboutTabParamList>();

const AboutTopTab: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Info" component={Info} />
      <Tab.Screen name="Contact" component={Contact} />
    </Tab.Navigator>
  );
};

export default AboutTopTab;
