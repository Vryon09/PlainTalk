import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, database } from "./firebase";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
    const collectionsData = userSnap.data().collections;
    const hasDuplicate =
      collectionsData.filter(
        (collection) =>
          collection.name.toLowerCase() === collectionName.toLowerCase(),
      ).length > 0;

    if (hasDuplicate) {
      toast.error("You already have this collection.");
      return;
    }

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

async function handleAddExplainToCollection({ explained, selectedCollection }) {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    // const explainedData = userSnap.data().explained;
    const collectionsData = userSnap.data().collections;

    const explainedAlreadyAdded = collectionsData
      .find(
        (collection) =>
          collection.name.toLowerCase() === selectedCollection.toLowerCase(),
      )
      .explained.find((explain) => explain.id === explained.id);

    if (explainedAlreadyAdded) {
      toast.error("Already added to the collection.");
      return;
    }

    const updatedCollections = collectionsData.map((collection) =>
      collection.name.toLowerCase() === selectedCollection.toLowerCase()
        ? {
            ...collection,
            explained: [
              ...collection.explained,
              {
                ...explained,
                id:
                  collection.explained?.length > 0
                    ? collection.explained[collection.explained.length - 1].id +
                      1
                    : 0,
                createdAt: new Date(),
              },
            ],
          }
        : collection,
    );

    await updateDoc(userRef, {
      collections: updatedCollections,
    });
  }
}

export function useAddExplainToCollection() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleAddExplainToCollection,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["collections"],
      });
    }, //to refetch asap
  });
}

export async function getExplainedByNameAndId({ collectionName, explainedId }) {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    const explained = data.collections
      .find((collection) => collection.name === collectionName)
      .explained.find((item) => item.id === +explainedId);

    return explained || {};
  } else {
    return {};
  }
}
