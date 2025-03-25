import React, { useEffect, useState } from "react";
import {
  Modal,
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
  Keyboard,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { globalStyles } from "../../styles/global";
import { SHADOWS } from "../../styles/theme";

interface CustomModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const CustomModal = ({
  visible,
  onClose,
  children,
  title,
}: CustomModalProps) => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const screenHeight = Dimensions.get("window").height;

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => setKeyboardHeight(e.endCoordinates.height),
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => setKeyboardHeight(0),
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  //TODO: Make the customModel better looking (without the white space)

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaProvider>
        <SafeAreaView style={styles.safeArea} edges={["top", "bottom"]}>
          <TouchableOpacity
            style={styles.overlay}
            activeOpacity={1}
            onPress={onClose}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={styles.keyboardView}
            >
              <View
                style={[
                  styles.modalView,
                  {
                    maxHeight: keyboardHeight
                      ? screenHeight - keyboardHeight - 40
                      : screenHeight * 0.85,
                  },
                ]}
                onStartShouldSetResponder={() => true}
                onTouchEnd={(e) => e.stopPropagation()}
              >
                {title && <Text style={styles.title}>{title}</Text>}
                <ScrollView
                  style={styles.contentContainer}
                  contentContainerStyle={styles.scrollContent}
                >
                  {children}
                </ScrollView>
                <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                  <Text style={styles.closeButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableOpacity>
        </SafeAreaView>
      </SafeAreaProvider>
    </Modal>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "center",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    marginVertical: 20,
    alignSelf: "center",
    ...SHADOWS.medium,
  },
  contentContainer: {
    flex: 1,
    marginVertical: 10,
  },
  scrollContent: {
    flexGrow: 1,
  },
  title: {
    ...globalStyles.title,
    marginBottom: 0,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#FF4040",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: "auto",
    minWidth: "85%",
    alignSelf: "center",
  },
  closeButtonText: {
    ...globalStyles.subSubTitle,
    color: "white",
    textAlign: "center",
  },
});

export default CustomModal;
