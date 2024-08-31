import { StyleSheet, Text, Touchable, TouchableOpacity, View} from "react-native";
import React from "react";
import { Button } from "react-native-paper";

const AuthButton = ({ type, func }) => {
  return (
      <Button style={styles.authButton} mode="contained" onPress={func}>
        {type}
      </Button>
  );
};

export default AuthButton;

const styles = StyleSheet.create({
  authButton: {
    width: "100%",
    backgroundColor: "#0098FF",
    borderRadius: 100,
    display: "flex",
    justifyContent: "center",
    marginTop: 10
  },
});
