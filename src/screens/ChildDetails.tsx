import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import Card from "./shared/Card";
import AddChoreForm from "./AddChore";
import CustomModal from "./shared/CustomModal";
import { globalStyles } from "../styles/global";
import { ChoreInfo } from "../types/interfaces";
import { RouteProp } from "@react-navigation/native";
import { useChildren } from "../hooks/useChildren";
import { useChores } from "../hooks/useChores";

type RootStackParamList = {
  Details: { childId: string };
};

type ChildDetailsRouteProp = RouteProp<RootStackParamList, "Details">;

interface Props {
  route: ChildDetailsRouteProp;
}

const ChildDetails: React.FC<Props> = ({ route }) => {
  const { childId } = route.params;
  const { getChildById } = useChildren();
  const {
    addNewChore,
    removeExistingChore,
    toggleChoreStatus,
    chores,
    loading,
    getChores,
  } = useChores(childId);

  const [modalVisible, setModalVisible] = React.useState<boolean>(false);

  React.useEffect(() => {
    getChores();
  }, [getChores]);

  const child = getChildById(childId);

  const handleAddChore = (chore: Omit<ChoreInfo, "id">): void => {
    addNewChore(chore);
    setModalVisible(false);
  };

  const handleRemoveChore = (choreId: string) => {
    removeExistingChore(choreId);
  };

  const handleToggleChore = (choreId: string) => {
    toggleChoreStatus(choreId);
  };

  if (!child) return null;

  return (
    <View style={globalStyles.container}>
      <Card>
        <View>
          <View style={styles.profileSection}>
            <Image
              source={
                child.gender === "female"
                  ? require("../../assets/images/woman.png")
                  : require("../../assets/images/boy.png")
              }
              style={globalStyles.childImage}
            />
            <View>
              <Text style={globalStyles.title}>Name: {child.name}</Text>
              <Text style={globalStyles.detail}>Age: {child.age}</Text>
              <Text style={globalStyles.detail}>Notes: {child.notes}</Text>
              <Text style={globalStyles.subTitle}>Chores:</Text>
            </View>
          </View>
          <View style={styles.choreListContainer}>
            <FlatList
              data={chores}
              keyExtractor={(chore) => chore.id}
              refreshing={loading}
              onRefresh={getChores}
              renderItem={({ item: chore }) => (
                <Card>
                  <Image
                    source={require("../../assets/images/broom.png")}
                    style={globalStyles.choreImage}
                  />
                  <View style={styles.choreContainer}>
                    <View style={[globalStyles.Info, styles.info]}>
                      <Text style={globalStyles.subSubTitle}>
                        Title: {chore.title}
                      </Text>
                      <Text
                        style={[globalStyles.text, styles.description]}
                        numberOfLines={2}
                        ellipsizeMode="tail"
                      >
                        Description: {chore.description}
                      </Text>
                      <Text
                        style={[
                          globalStyles.text,
                          chore.status === "completed"
                            ? styles.completedText
                            : styles.pendingText,
                        ]}
                      >
                        Status: {chore.status}
                      </Text>
                      <Text style={styles.choreDetail}>
                        Reward Points: {chore.rewardPoints}
                      </Text>
                    </View>

                    <View style={styles.buttonContainer}>
                      <TouchableOpacity
                        style={[
                          styles.toggleButton,
                          chore.status === "completed"
                            ? styles.completedButton
                            : styles.pendingButton,
                        ]}
                        onPress={() => handleToggleChore(chore.id)}
                      >
                        <MaterialIcons
                          name={
                            chore.status === "completed"
                              ? "undo"
                              : "check-circle"
                          }
                          size={24}
                          color="white"
                        />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.deleteButton}
                        onPress={() => handleRemoveChore(chore.id)}
                      >
                        <MaterialIcons name="delete" size={24} color="white" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </Card>
              )}
              scrollEnabled={true}
              style={styles.choreList}
            />
          </View>
        </View>
      </Card>

      <CustomModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Add Chore"
      >
        <AddChoreForm addChore={handleAddChore} />
      </CustomModal>

      <TouchableOpacity
        onPress={() => setModalVisible(true)}
        activeOpacity={0.6}
      >
        <Image
          source={require("../../assets/images/broom.png")}
          style={globalStyles.addButton}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ChildDetails;

const styles = StyleSheet.create({
  choreDetail: {
    ...globalStyles.text,
    marginBottom: 0,
  },
  profileSection: {
    flexDirection: "column",
    padding: 10,
  },
  detailsSection: {
    marginLeft: 10,
  },
  choreContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
  },
  choreListContainer: {
    maxHeight: "45%", // Adjust based on screen size
    marginVertical: 10,
  },
  choreList: {
    flexGrow: 0,
  },
  buttonContainer: {
    flexDirection: "column",
    gap: 10,
    alignItems: "center",
  },
  toggleButton: {
    padding: 10,
    borderRadius: 25,
  },
  completedButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  pendingButton: {
    backgroundColor: "#FFA500",
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 25,
    marginLeft: 10,
  },
  description: {
    flexShrink: 1,
    maxWidth: "100%",
  },
  info: {
    flex: 1,
  },
  completedText: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  pendingText: {
    color: "#FFA500",
    fontWeight: "bold",
  },
});
