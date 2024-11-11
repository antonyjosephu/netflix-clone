import { initializeApp } from "firebase/app";
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import { addDoc, collection, getFirestore } from "firebase/firestore";
  import { toast } from "react-toastify";
  const firebaseConfig = {
    apiKey: "AIzaSyAOS0gQng2y8dlqRlnwzJKlPpCvsbOkPR4",

    authDomain: "netflix-clone-85c55.firebaseapp.com",
  
    projectId: "netflix-clone-85c55",
  
    storageBucket: "netflix-clone-85c55.firebasestorage.app",
  
    messagingSenderId: "455171132789",
  
    appId: "1:455171132789:web:866c80fe271e3455aed73c"
  
  
  
  
  };
  
  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db= getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local" ,
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
};
const login = async (email, password) => {;
try {
  await signInWithEmailAndPassword(auth,email,password);
} catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
}
}
const logout =()=>{
    signOut(auth);  
}
   export {auth,db,login,signup,logout};  
