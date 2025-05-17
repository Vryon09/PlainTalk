import { arrayRemove, doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "./firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

async function handleDelete(item) {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      explained: arrayRemove(item),
    });
  }
}

export function useDelete() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["explained"],
      });
    },
  });
}
