import {createUserWithEmailAndPassword } from "firebase/auth";
import { Auth } from "./firebaseconfig";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function SignUp(email, password,setLoading) {
  createUserWithEmailAndPassword(Auth, email, password)
    .then(async (userCredential) => {
      setLoading(0)
      const user = userCredential.user;
      await AsyncStorage.setItem("email",user.email)
      await AsyncStorage.setItem("password",password)
      return user
    })
    .catch((error) => {
      setLoading(0)
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode,errorMessage )
    });
}