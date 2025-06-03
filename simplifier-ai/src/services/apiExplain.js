import { useMutation, useQueryClient } from "@tanstack/react-query";
import { auth, database } from "./firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

const API_URL = import.meta.env.VITE_API_URL;
// https://plaintalk-backend.onrender.com
// http://localhost:3001
// http://192.168.18.9:3001
const handleExplain = async ({
  input,
  setOutput,
  historyOpen,
  setHistoryOpen,
  context = "",
}) => {
  if (input === "") return;

  setOutput("");

  const response = await fetch(`${API_URL}/api/explain`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input, context }),
  });

  const data = await response.json();

  console.log("API Response:");
  console.log(data);
  const message = data.choices?.[0]?.message?.content;

  setOutput(message || "No response received.");

  if (!historyOpen) {
    setHistoryOpen(true);
  }

  if (message) {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // const data = userSnap.data();

      const newExplained = {
        statement: input,
        // result: formattedOutput(message),
        result: message,
        createdAt: new Date(),
        // id:
        //   data.explained?.length > 0
        //     ? data.explained[data.explained.length - 1].id + 1
        //     : 0,
        id: uuidv4(),
      };

      await updateDoc(userRef, {
        explained: arrayUnion(newExplained),
      });
    }
  }
};

export function useExplain() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: handleExplain,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["explained"],
      });
    },
  });
}

export async function getExplained() {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    return data.explained || [];
  } else {
    return [];
  }
}

export async function getExplainedById(id) {
  const userRef = doc(database, "users", auth.currentUser.uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    const data = userSnap.data();

    const explainedArr = data.explained;
    const explained = explainedArr.find((explained) => explained.id === id);

    return explained || {};
  } else {
    return {};
  }
}
