import { signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Auth } from "./firebaseconfig";

export default function LogIn(email, password,setLoading) {
  signInWithEmailAndPassword(Auth, email, password)
    .then(async (userCredential) => {
      setLoading(0)
      const user = userCredential.user;
      await AsyncStorage.setItem("email",user.email)
      await AsyncStorage.setItem("password",password)
      return user;
    })
    .catch((error) => {
      setLoading(0)
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode,errorMessage )
    })
}