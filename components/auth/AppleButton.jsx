import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AppleButton = () => {
  const handlePress = () => {
    // Add your sign-up logic here
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.googleButton} onPress={handlePress}>
        <Icon name="apple" size={20} color="#FFF" style={styles.icon} />
        <Text style={styles.buttonText}>Sign Up with Apple</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fafafa",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  icon: {
    marginRight: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AppleButton;
