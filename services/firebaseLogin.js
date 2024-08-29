import { app } from "./firebaseconfig.js"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Auth = getAuth(app);
export default function LogIn(email, password) {
  signInWithEmailAndPassword(Auth, email, password)
    .then((userCredential) => {
      const user = userCredential;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode,errorMessage )
    });
}