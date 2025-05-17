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

  const systemPrompt = `You are a thoughtful explainer of deep or complex statements. When someone gives you a confusing or profound sentence, your job is to make it easy to understand.
  
  First, explain the meaning like you're talking to a basic english speaker who is curious but confused.
  
  Then, simplify it even more as if you're explaining to a 10-year-old who needs things broken down gently.
  
  Your tone should be friendly, clear, and human — not robotic.
  `;

  const userPrompt = `Statement: "${input}"`;

  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization:
          "Bearer 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", // Replace with your API Key
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // or your domain
        "X-Title": "Simplifier",
      },
      body: JSON.stringify({
        model: "huggingfaceh4/zephyr-7b-beta:free",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    },
  );

  const data = await response.json();
  const message = data.choices?.[0]?.message?.content;

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
        result: formattedOutput(message)[0],
        id: data.explained.length + 1,
        // createdAt: new Date(),
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

    console.log(explainedArr);
    console.log(explained);

    return explained || {};
  } else {
    return {};
  }
}
