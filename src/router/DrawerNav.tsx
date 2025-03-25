import {
  createDrawerNavigator,
  DrawerNavigationOptions,
  DrawerNavigationProp,
} from "@react-navigation/drawer";
import ChildStack from "./ChildStack";
import AboutTopTab from "./AboutTopTab";
import Header from "../screens/shared/Header";
import ProfileScreen from "../screens/ProfileScreen";
import { RootDrawerParamList } from "../types/navigations";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNav: React.FC = () => {
  const screenOptions: DrawerNavigationOptions = {
    header: (props) => (
      <Header
        navigation={
          props.navigation as DrawerNavigationProp<RootDrawerParamList>
        }
      />
    ),
  };

  return (
    <Drawer.Navigator screenOptions={screenOptions}>
      <Drawer.Screen name="Home" component={ChildStack} />
      <Drawer.Screen name="About" component={AboutTopTab} />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default DrawerNav;
