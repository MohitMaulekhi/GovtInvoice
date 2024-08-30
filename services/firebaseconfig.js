import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAbcVhRFqgSYjo-KN7ASKFfbwy8YEjwD0s",
    authDomain: "govtinvoice-26ab8.firebaseapp.com",
    projectId: "govtinvoice-26ab8",
    storageBucket: "govtinvoice-26ab8.appspot.com",
    messagingSenderId: "732066804674",
    appId: "1:732066804674:web:54cedf774f96d39a949c5b"
  };

const app = initializeApp(firebaseConfig);
const Auth = getAuth(app);
export {app,Auth};