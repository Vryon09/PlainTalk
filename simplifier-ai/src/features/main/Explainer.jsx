import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addExplained, getPrevExplained } from "../history/historySlice";
import { useOutletContext } from "react-router-dom";
import { Copy, Mic, X } from "lucide-react";
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

  const handleInput = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = e.target.scrollHeight + "px";
  };

  function onExplain(e) {
    e.preventDefault();
    handleExplain({ input, setOutput, historyOpen, setHistoryOpen });
  }

  useEffect(() => {
    console.log(listening);
  }, [listening]);

  return (
    <>
      <form onSubmit={onExplain} className="mx-auto max-w-2xl space-y-2">
        <textarea
          disabled={isPending || listening}
          value={listening ? "" : input}
          onInput={handleInput}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            listening
              ? "Listening..."
              : `${auth.currentUser ? `Hi ${auth.currentUser.displayName.split(" ")[0]}, ` : ""}Write a confusing or deep sentence you'd like me to simplify.`
          }
          className="w-full resize-none rounded-md border-1 border-neutral-400 p-2 outline-none focus:ring-2 focus:ring-indigo-600"
        />

        <div className="flex w-full justify-end gap-2">
          {!listening ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                resetTranscript();
                SpeechRecognition.startListening({ continuous: true });
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
            >
              <Mic color="white" size={18} />
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.preventDefault();
                SpeechRecognition.stopListening();
                setInput((input) => input + transcript);
                return;
              }}
              className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
            >
              <X color="white" size={18} />
            </button>
          )}
          {/* <button
            onClick={(e) => {
              e.preventDefault();

              if (listening) {
                SpeechRecognition.stopListening();
                setInput((input) => input + transcript);
                return;
              }

              resetTranscript();
              SpeechRecognition.startListening({ continuous: true });
            }}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
          >
            {!listening && <Mic color="white" size={18} />}
            {listening && <X color="white" size={18} />}
          </button> */}

          <button
            disabled={isPending || listening}
            className="cursor-pointer rounded bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-700 active:bg-indigo-700 disabled:cursor-not-allowed"
          >
            {isPending ? "Explaining..." : "Explain"}
          </button>
        </div>

        {/* {output && (
          <div className="rounded bg-gray-100 p-2">
            <h3 className="text-lg font-bold">Results:</h3>
            <div className="space-y-2">
              {formattedOutput(output).map((result, i) => (
                <div key={i}>
                  <p className="font-semibold">{result.split(":")[0]}:</p>
                  <p>{result.split(":")[1]}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}

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
