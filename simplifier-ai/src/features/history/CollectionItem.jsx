import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import ReactMarkdown from "react-markdown";
import { handleCopy } from "../../utils/helpers";
import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { getExplainedByNameAndId } from "../../services/apiHistory";

function CollectionItem() {
  const { collectionName, explainedId } = useParams();

  const { data: explained, isPending } = useQuery({
    queryKey: [
      "selectedCollectionItem",
      { name: collectionName, id: explainedId },
    ],
    queryFn: () => getExplainedByNameAndId({ collectionName, explainedId }),
  });

  if (isPending)
    return (
      <div className="mt-10 flex items-center justify-center">
        <TailSpin
          height="60"
          width="60"
          color="#4f39f6"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      <div>
        <p className="font-bold">Statement:</p>
        <p>{explained.statement}</p>
      </div>
      <div className="space-y-2">
        <ReactMarkdown>{explained.result}</ReactMarkdown>
      </div>
      <div className="flex w-full justify-end">
        <button
          onClick={(e) => {
            e.preventDefault();
            const success = handleCopy(explained.result);
            if (success) toast.success("Copied Successfully!");
          }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-[50%] bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-700"
        >
          <Copy color="white" size={16} />
        </button>
      </div>
    </div>
  );
}

export default CollectionItem;
