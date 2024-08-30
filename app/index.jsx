import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import visionImage from "../assets/VisionImage2.png"
import { Button, TextInput } from 'react-native-paper'
import AuthButton from '../components/auth/AuthButton'
import { SignUp, LogIn } from "../services/index.js"
import { useState, useEffect } from "react"
import firebase from 'firebase/compat/app'
import { router, useNavigation } from 'expo-router'
import { Auth, app } from '../services/firebaseconfig.js'
const index = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [alreadyUser, setAlreadyUser] = useState(0)
  const navigate = useNavigation()
  useEffect(() => {
    const unsubscribe = Auth.onAuthStateChanged(user => {
      if (user) {
        router.replace("/");
        navigate.navigate("main")
      }
      else{
        navigate.navigate("/")
      }
      return () => unsubscribe();
    },[]);

    // Cleanup subscription on unmount
    return () => unsubscribe();
  });
  return (

    <View style={styles.authenticationPage}>
      <Image style={styles.visionImage2Icon} resizeMode="cover" source={visionImage} />

      <View style={styles.containerMain} >
        <View style={styles.ellipse}>
        </View>
        <Text style={styles.letsConnectWith}>Let’s Connect With Us!</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={Email}
          onChangeText={text => setEmail(text)}
          label="Email" />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          value={Password}
          onChangeText={text => setPassword(text)}
          secureTextEntry={true} />
        {alreadyUser ? <AuthButton type={"Sign Up"} func={() => SignUp(Email, Password)} /> : <AuthButton type={"Log In"} func={() => LogIn(Email, Password)} />}
        {alreadyUser ? <View><Text>Don't have an account</Text><Button onPress={(temp) => setAlreadyUser(0)}><Text>Log in</Text></Button></View> :
          <View><Text>Already have an account</Text><Button onPress={() => setAlreadyUser(1)}><Text>Sign Up</Text></Button></View>}
      </View>

    </View>

  )
}

export default index

const styles = StyleSheet.create({
  Text: {
    fontSize: 20,
    color: "#000"
  },
  authenticationPage: {
    borderRadius: 32,
    flex: 1,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  visionImage2Icon: {
    width: "100%",
    height: "25%"
  },
  containerMain: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%"
  },
  ellipse: {
    backgroundColor: "#D9D9D9",
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: "center",
    position: "relative",
    bottom: 50,
    marginBottom: -50
  },
  letsConnectWith: {
    fontSize: 32,
    letterSpacing: 1,
    lineHeight: 48,
    textAlign: "left",
    color: "#000",
    fontWeight: "bold"
  },
  input: {
    width: "100%",

  }

})