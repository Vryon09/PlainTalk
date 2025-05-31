import { Ellipsis } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDelete } from "../../services/apiHistory";
import { useState } from "react";
import Modal from "../../ui/Modal";

function HistoryTab({
  explained,
  setHistoryOpen,
  isMobile,
  tabDropped,
  setTabDropped,
  dropdownRef,
}) {
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
      className="group relative flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300 active:bg-neutral-300"
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

          setTabDropped(explained.id);
        }}
        disabled={tabDropped === explained.id}
        style={
          isMobile || tabDropped === explained.id ? { display: "flex" } : {}
        }
        // className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400"
        className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400 active:bg-neutral-400"
      >
        <Ellipsis size={14} />
      </button>

      {tabDropped === explained.id && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
          style={{
            position: "absolute",
            right: "0",
            bottom: "-70%",
            transform: "translate(0, 70%)",
          }}
          className="z-20 rounded-2xl bg-neutral-500 px-2 py-4"
        >
          <div
            onClick={() => setIsOpen(true)}
            className="rounded-xl px-3 py-2 text-sm tracking-wide text-neutral-50 hover:bg-neutral-600"
          >
            Delete
          </div>
          <div className="rounded-xl px-3 py-2 text-sm tracking-wide text-neutral-50 hover:bg-neutral-600">
            Add to Collection
          </div>
        </div>
      )}

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
