import { useMutation, useQueryClient } from "@tanstack/react-query";
import { formattedOutput } from "../utils/helpers";
import { auth, database } from "./firebase";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";

const handleExplain = async ({
  input,
  setOutput,
  historyOpen,
  setHistoryOpen,
}) => {
  if (input === "") return;

  setOutput("");

  const response = await fetch("http://localhost:3001/api/explain", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ input }),
  });

  const data = await response.json();

  console.log("API Response:");
  console.log(data);
  const message = data.choices?.[0]?.message?.content;

  console.log(message);

  setOutput(message || "No response received.");

  if (!historyOpen) {
    setHistoryOpen(true);
  }

  if (message) {
    const userRef = doc(database, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      const newExplained = {
        statement: input,
        // result: formattedOutput(message),
        result: message,
        id:
          data.explained?.length > 0
            ? data.explained[data.explained.length - 1].id + 1
            : 0,
        createdAt: new Date(),
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
    const explained = explainedArr.find((explained) => explained.id === +id);

    return explained || {};
  } else {
    return {};
  }
}
