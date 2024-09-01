import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AppleButton = () => {
  const handlePress = () => {
    // Add sign-up logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.appleButton} onPress={handlePress}>
        <Icon name="apple" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Sign Up with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  appleButton: {
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingVertical: 10,
    paddingHorizontal: 60,
    textAlign: "center",
    borderRadius: 25,
    marginTop: 10,
    width: 300
  },
  icon: {
    marginRight: 15,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppleButton;
