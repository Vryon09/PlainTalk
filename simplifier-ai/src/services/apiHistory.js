import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
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

export async function getCollections() {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    return data.collections || [];
  } else {
    return [];
  }
}

async function handleAddCollection(collectionName) {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  const newCollection = {
    name: collectionName,
    explained: [],
    createdAt: new Date(),
  };

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      collections: arrayUnion(newCollection),
    });
  }
}

export function useAddCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    }, //to refetch asap
  });
}
