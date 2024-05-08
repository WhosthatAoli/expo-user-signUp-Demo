import {
  Button,
  View,
  Modal,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React from "react";
import { useState } from "react";

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    lastName?: string;
    email?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  const validateForm = () => {
    let tempErrors: { firstName?: string; lastName?: string; email?: string } =
      {};
    if (!firstName) tempErrors.firstName = "First name is required";
    if (!lastName) tempErrors.lastName = "Last name is required";
    if (!email) tempErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email))
      tempErrors.email = "Email is not valid";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const saveData = () => {
    if (validateForm()) {
      setLoading(true);
      // Mock API call
      setTimeout(() => {
        console.log(firstName, lastName, email);
        setModalVisible(false);
        setLoading(false);
        setSuccessModalVisible(true);
      }, 2000);
    }
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        visible={modalVisible}
        presentationStyle="pageSheet"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              placeholder="First Name"
              style={styles.textInput}
              onChangeText={(text) => setFirstName(text)}
            />
            {errors.firstName && (
              <Text style={styles.errorText}>{errors.firstName}</Text>
            )}
            <TextInput
              placeholder="Last Name"
              style={styles.textInput}
              onChangeText={(text) => setLastName(text)}
            />
            {errors.lastName && (
              <Text style={styles.errorText}>{errors.lastName}</Text>
            )}
            <TextInput
              placeholder="Email"
              style={styles.textInput}
              onChangeText={(text) => setEmail(text)}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
            <TouchableOpacity style={styles.saveButton} onPress={saveData}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.textStyle}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={successModalVisible}
        presentationStyle="pageSheet"
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.successText}>Data successfully saved</Text>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={() => setSuccessModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Button
        title="Add User"
        onPress={() => {
          setModalVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 200,
    marginBottom: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  saveButton: {
    backgroundColor: "#2196F3",
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    width: "100%",
    alignItems: "center",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
  successText: {
    padding: 10, // adjust the value as needed
  },
});
