import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function CollectionTab({ isMobile, explained, setHistoryOpen, collection }) {
  const navigate = useNavigate();
  const { historyId } = useParams();

  return (
    <div
      style={{
        backgroundColor: `${+historyId === explained.id ? "#d4d4d4" : ""}`,
      }}
      onClick={() => {
        if (isMobile) {
          setHistoryOpen(false);
        }
        navigate(`/main/collection/${collection.name}/${explained.id}`);
      }}
      className="group flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300 active:bg-neutral-300"
    >
      <p className="text-sm">
        {explained.statement.length > 20
          ? explained.statement.slice(0, 20).trim() + "..."
          : explained.statement.trim()}
      </p>

      <button
        style={isMobile ? { display: "flex" } : {}}
        className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400 active:bg-neutral-400"
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default CollectionTab;
