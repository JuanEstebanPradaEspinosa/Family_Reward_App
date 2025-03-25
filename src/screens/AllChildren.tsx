import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button,
} from "react-native";
import React, { useCallback } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./shared/Card";
import AddChildForm from "./AddChild";
import CustomModal from "./shared/CustomModal";
import { globalStyles } from "../styles/global";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ChildInfo } from "../types/interfaces";
import { useChildren } from "../hooks/useChildren";
import LoadingSpinner from "./shared/LoadingSpinner";

type RootStackParamList = {
  Details: { childId: string };
};

type NavigationProps = NativeStackNavigationProp<RootStackParamList, "Details">;

const AllChildren: React.FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const {
    children,
    loading,
    error,
    addNewChild,
    removeExistingChild,
    refreshChildren,
  } = useChildren();

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);
  const [refreshing, setRefreshing] = React.useState<boolean>(false);

  React.useEffect(() => {
    refreshChildren();
  }, [refreshChildren]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      await refreshChildren();
    } catch (error) {
      console.error("Failed to refresh:", error);
    } finally {
      setRefreshing(false);
    }
  }, [refreshChildren]);

  const handleAddChild = async (child: Omit<ChildInfo, "id" | "chores">) => {
    try {
      await addNewChild(child);
      setModalVisible(false);
    } catch (error) {
      console.error("Failed to add child:", error);
    }
  };

  const handleRemoveChild = async (childId: string) => {
    try {
      await removeExistingChild(childId);
    } catch (error) {
      console.error("Failed to remove child:", error);
    }
  };

  const goToChildDetails = (child: ChildInfo): void => {
    navigation.navigate("Details", { childId: child.id });
  };

  if (loading && !refreshing) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error}</Text>
        <Button title="Retry" onPress={refreshChildren} />
      </View>
    );
  }

  //TODO: Make it scrollable
  //TODO: Add a search bar
  //TODO: Find a way to store images in the child object

  return (
    <View style={globalStyles.container}>
      <FlatList
        numColumns={1}
        keyExtractor={(child) => child.id}
        data={children}
        refreshing={refreshing}
        onRefresh={onRefresh}
        renderItem={({ item: child }) => (
          <TouchableOpacity onPress={() => goToChildDetails(child)}>
            <Card>
              <Image
                source={
                  child.gender === "female"
                    ? require("../../assets/images/woman.png")
                    : require("../../assets/images/boy.png")
                }
                style={globalStyles.childImage}
              />
              <View style={styles.childContainer}>
                <View style={globalStyles.Info}>
                  <Text style={globalStyles.title}>Name: {child.name}</Text>
                  <Text style={globalStyles.detail}>Age: {child.age}</Text>
                  <Text style={styles.choresCount}>
                    Active Chores: {child.chores.length}
                  </Text>
                </View>
                <TouchableOpacity onPress={() => handleRemoveChild(child.id)}>
                  <MaterialIcons name="delete" size={40} color="red" />
                </TouchableOpacity>
              </View>
            </Card>
          </TouchableOpacity>
        )}
      />

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Add Child"
      >
        <AddChildForm addChild={handleAddChild} />
      </CustomModal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.6}
      >
        <Image
          source={require("../../assets/images/add-user.png")}
          style={globalStyles.addButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default AllChildren;

const styles = StyleSheet.create({
  choresCount: {
    fontSize: 14,
    color: "#2196F3",
    marginTop: 5,
    fontWeight: "500",
  },
  childContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
