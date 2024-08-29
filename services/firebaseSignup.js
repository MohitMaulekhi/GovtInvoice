import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebaseconfig";
const auth = getAuth(app);
export default function SignUp(email, password) {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential ;
      return user
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      console.log(errorCode,errorMessage )
    });
}