import { ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import visionImage from "../assets/VisionImage2.png"
import userIcon from "../assets/profile.png"
import { Button, TextInput } from 'react-native-paper'
import AuthButton from '../components/auth/AuthButton'
import { SignUp, LogIn } from "../services/index.js"
import { useState, useEffect } from "react"
import { router } from 'expo-router'
import { Auth} from '../services/firebaseconfig.js'
import GoogleButton from "../components/auth/GoogleButton.jsx"
import AppleButton from "../components/auth/AppleButton.jsx"
import AsyncStorage from '@react-native-async-storage/async-storage'
const index = () => {
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const [alreadyUser, setAlreadyUser] = useState(0)
  const [loading,setLoading] = useState(0)
  useEffect(()=>{
    async function fetchUserData() {
      setLoading(1)
      const email = await AsyncStorage.getItem("email")
      const password = await AsyncStorage.getItem("password")
      if(email && password){
        LogIn(email, password,setLoading)
        router.replace("/main/home")
      }
      setLoading(0)
    }
    fetchUserData()
    
  },[])
    Auth.onAuthStateChanged(async(user) => {
      if(user != null){
      router.replace("/main/home")
     }
    }
    )
      


  return loading?(
    <View style={[styles.container, styles.horizontal]}>
    <ActivityIndicator size="large" color="#0000ff"  />
  </View>):(

    <View style={styles.authenticationPage}>
      <Image
        style={styles.visionImage2Icon}
        resizeMode="cover"
        source={visionImage}
      />

      <View style={styles.containerMain}>
        <View style={styles.ellipse}>
          <Image
            style={styles.userIcon}
            resizeMode="cover"
            source={userIcon}
          />
        </View>
        <Text style={styles.letsConnectWith}>Start Invoicing with Us!</Text>
        <TextInput
          style={styles.input}
          mode="outlined"
          value={Email}
          onChangeText={(text) => setEmail(text)}
          label="Email"
        />
        <TextInput
          style={styles.input}
          mode="outlined"
          label="Password"
          value={Password}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry={true}
        />
        {!alreadyUser ? (
          <AuthButton type={"Sign Up"} func={() => {setLoading(1);SignUp(Email, Password,setLoading)}} />
        ) : (
          <AuthButton type={"Log In"} func={()=> {setLoading(1);LogIn(Email, Password,setLoading)}} />
        )}
        {!alreadyUser ? (
          <View style = {styles.authText}>
            <Text>Already have an account</Text>
            <Button onPress={(temp) => setAlreadyUser(1)}>
              <Text>Log in</Text>
            </Button>
          </View>
        ) : (
          <View style = {styles.authText}>
            <Text>Don't have an account</Text>
            <Button onPress={() => setAlreadyUser(0)}>
              Sign Up
            </Button>
            
          </View>
        )}
        <View style = {{margin:5}}>
        <GoogleButton />
        <AppleButton />
        </View>
      </View>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
  Text: {
    fontSize: 20,
    color: "#000",
  },
  authText:{
    margin:5
  },
  authenticationPage: {
    borderRadius: 32,
    flex: 1,
    width: "100%",
    overflow: "scroll",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  visionImage2Icon: {
    width: "100%",
    height: "35%",
    objectFit: "fit",
  },
  containerMain: {
    flex: 1,
    alignItems: "center",
    width: "100%",
    paddingHorizontal: "5%",
  },
  ellipse: {
    backgroundColor: "#D9D9D9",
    width: 80,
    height: 80,
    borderRadius: 100,
    alignItems: "center",
    position: "relative",
    bottom: 50,
    marginBottom: -50,
    opacity: 0.85,
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2, }, 
    shadowOpacity: 0.25, 
    shadowRadius: 4, 
    elevation: 5
  },
  userIcon: {
    height: 50,
    width: 50,
    position: "relative",
    top: 15,

  },
  letsConnectWith: {
    fontSize: 28,
    letterSpacing: 1,
    lineHeight: 48,
    textAlign: "left",
    color: "#000",
    fontWeight: "bold",
    // padding: 10,
  },
  input: {
    width: '90%',
  },
});
