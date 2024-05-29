import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { getDoc, doc, setDoc } from "firebase/firestore";

export const loginWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<{ success: boolean; user?: any; error?: string }> => {
  try {
    const res: UserCredential = await signInWithEmailAndPassword(auth, email, password);
    // Retrieve user data from Firestore
    const userId = res.user.uid;
    const userRef = doc(db, "users", userId);
    const userDoc = await getDoc(userRef);
    
    return {
      success: true,
      user: userDoc.data()
    };
  } catch (error: any) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
};


export const signupWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
  repeatpassword: string,
  dob: string,
  gender: string
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    const userDocRef = doc(db, "users", user.uid);
    await setDoc(userDocRef, {
      uid: user.uid,
      name,
      email,
      dob,
      gender,
    });
    return { success: true };
  } catch (error: any) {
    console.error('Error:', error);
    return { success: false, error: error.message };
  }
};
export const logout = async()=>{
  try{
    await signOut(auth);
    return {success:true}
  }catch(error:any){
    console.error('Error:', error)
  }
}
