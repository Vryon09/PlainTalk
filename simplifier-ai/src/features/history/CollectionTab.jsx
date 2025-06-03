import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useRemoveExplainedFromCollection } from "../../services/apiHistory";
import Modal from "../../ui/Modal";
import { useState } from "react";

function CollectionTab({ isMobile, explained, setHistoryOpen, collection }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();
  const { collectionName, explainedId } = useParams();
  const { mutate: handleDelete } = useRemoveExplainedFromCollection();

  function onDelete() {
    setIsDeleting(true);

    if (explained.id === explainedId) {
      navigate("/main/explainer");
    }

    handleDelete({ collectionName, explainedId });
  }

  if (isDeleting)
    return (
      <div
        style={{
          pointerEvents: `${isDeleting ? "none" : "auto"}`,
        }}
        className="flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2"
      >
        <p className="text-sm">Deleting...</p>
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: `${explainedId === explained.id ? "#d4d4d4" : ""}`,
      }}
      onClick={() => {
        if (isDeleting) return;

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
        onClick={(e) => {
          e.stopPropagation();
          setIsDeleteModalOpen(true);
        }}
        style={isMobile ? { display: "flex" } : {}}
        className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400 active:bg-neutral-400"
      >
        <X size={14} />
      </button>

      <Modal
        isOpen={isDeleteModalOpen}
        onConfirm={onDelete}
        onClose={() => setIsDeleteModalOpen(false)}
      >
        Are you sure you want to delete this item?
      </Modal>
    </div>
  );
}

export default CollectionTab;
