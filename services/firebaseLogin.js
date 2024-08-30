import { signInWithEmailAndPassword } from "firebase/auth";
import { Auth } from "./firebaseconfig";

export default function LogIn(email, password) {
  signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode,errorMessage )
    });
}