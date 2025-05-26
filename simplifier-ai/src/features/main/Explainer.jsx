import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addExplained, getPrevExplained } from "../history/historySlice";
import { useOutletContext } from "react-router-dom";
import { AudioLines, Copy, Mic, X } from "lucide-react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useExplain } from "../../services/apiExplain";
import { auth } from "../../services/firebase";
import ReactMarkdown from "react-markdown";
import { handleCopy } from "../../utils/helpers";
import toast from "react-hot-toast";
// import { useGoogleSignIn } from "../../services/apiSignin";

function Explainer() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const { historyOpen, setHistoryOpen } = useOutletContext();

  const { mutate: handleExplain, isPending } = useExplain();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert("Browser doesn't support speech recognition.");
  }

  function onExplain(e) {
    e.preventDefault();
    handleExplain({ input, setOutput, historyOpen, setHistoryOpen });
  }

  useEffect(() => {
    if (!listening && transcript) {
      setInput((input) => input + transcript);
      resetTranscript();
    }
  }, [listening, resetTranscript, transcript]);

  return (
    <>
      <form onSubmit={onExplain} className="mx-auto max-w-2xl space-y-2">
        <div className="relative">
          <textarea
            disabled={isPending || listening}
            value={listening ? "" : input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              listening
                ? "Listening..."
                : `${auth.currentUser ? `Hi ${auth.currentUser.displayName.split(" ")[0]}, ` : ""}Write a confusing or deep sentence you'd like me to simplify.`
            }
            className="min-h-20 w-full resize-none rounded-md border-1 border-neutral-400 p-2 pr-10 text-sm outline-none placeholder:text-sm focus:ring-2 focus:ring-indigo-600 sm:text-base sm:placeholder:text-base"
          />
          {input !== "" && (
            <button
              style={{
                position: "absolute",
                right: "6px",
                top: "50%",
                transform: "translate(0,-50%)",
              }}
              onClick={() => setInput("")}
              className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
            >
              <X color="white" size={14} />
            </button>
          )}
        </div>

        <div className="flex w-full justify-end gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();

              resetTranscript();
              SpeechRecognition.startListening();
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
          >
            {!listening && <Mic color="white" size={18} />}
            {listening && <AudioLines color="white" size={18} />}
          </button>

          <button
            disabled={isPending || listening}
            className="cursor-pointer rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 active:bg-indigo-700 disabled:cursor-not-allowed"
          >
            {isPending ? "Explaining..." : "Explain"}
          </button>
        </div>

        {output && <ReactMarkdown>{output}</ReactMarkdown>}
        {output && (
          <div className="flex w-full justify-end">
            <button
              onClick={(e) => {
                e.preventDefault();
                const success = handleCopy(output);
                if (success) toast.success("Copied Successfully!");
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
            >
              <Copy color="white" size={16} />
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default Explainer;
