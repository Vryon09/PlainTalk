import { signInWithPopup } from "firebase/auth";
import { auth, database, googleProvider } from "./firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useMutation } from "@tanstack/react-query";

async function handleGoogleSignIn() {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;
  const userRef = doc(database, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL,
      uid: user.uid,
      explained: [],
      collections: [],
    });
  }

  return user;
}

export function useGoogleSignIn() {
  return useMutation({
    mutationFn: handleGoogleSignIn,
  });
}
