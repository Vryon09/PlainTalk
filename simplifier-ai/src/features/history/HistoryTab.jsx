import { X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "../../services/apiHistory";
import { useState } from "react";
import Modal from "../../ui/Modal";

function HistoryTab({ explained, setHistoryOpen, isMobile }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { historyId } = useParams();

  const { mutate: handleDelete } = useDelete();

  function onDelete() {
    setIsDeleting(true);
    if (explained.id === +historyId) {
      navigate("/main/explainer");
    }
    handleDelete(explained);
  }

  if (isDeleting)
    return (
      <div className="flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2">
        <p className="text-sm">Deleting...</p>
      </div>
    );

  return (
    <div
      className="group flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300"
      style={{
        backgroundColor: `${+historyId === explained.id ? "#d4d4d4" : ""}`,
        pointerEvents: `${isDeleting ? "none" : "auto"}`,
      }}
      onClick={() => {
        if (isDeleting) return;

        if (isMobile) {
          setHistoryOpen(false);
        }
        navigate(`/main/history/${explained.id}`);
      }}
    >
      <p className="text-sm">
        {explained.statement.length > 20
          ? explained.statement.slice(0, 20).trim() + "..."
          : explained.statement.trim()}
      </p>

      <button
        onClick={(e) => {
          e.stopPropagation();

          setIsOpen(true);
        }}
        className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400"
      >
        <X size={14} />
      </button>

      <Modal
        isOpen={isOpen}
        onConfirm={onDelete}
        onClose={() => setIsOpen(false)}
      >
        Are you sure you want to delete this item?
      </Modal>
    </div>
  );
}

export default HistoryTab;
