import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'

const AuthButton = ({type,func}) => {
  return (
    <TouchableOpacity style={styles.authButton}>
      <Button  style={styles.authButton} mode="contained" onPress={func}>
        {type}
      </Button>
    </TouchableOpacity>
  )
}

export default AuthButton

const styles = StyleSheet.create({
  authButton: {
    width: "100%",
    backgroundColor: "#0098FF",
    borderRadius:100,
  }
})