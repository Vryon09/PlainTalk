import { Ellipsis } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useAddExplainToCollection,
  useDelete,
} from "../../services/apiHistory";
import { useState } from "react";
import Modal from "../../ui/Modal";
import toast from "react-hot-toast";

function HistoryTab({
  explained,
  setHistoryOpen,
  isMobile,
  tabDropped,
  setTabDropped,
  dropdownRef,
  collections,
  collectionsLoading,
  selectedCollection,
  setSelectedCollection,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddToCollectionModalOpen, setIsAddToCollectionModalOpen] =
    useState(false);
  const navigate = useNavigate();

  const { historyId } = useParams();

  const { mutate: handleDelete } = useDelete();
  const { mutate: handleAddExplainToCollection } = useAddExplainToCollection();

  function onDelete() {
    setIsDeleting(true);
    if (explained.id === historyId) {
      navigate("/main/explainer");
    }
    handleDelete(explained);
  }

  function onAddExplainToCollection() {
    if (selectedCollection === "") {
      toast.error("You did not select a category");
      return;
    }
    handleAddExplainToCollection({ explained, selectedCollection });
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
      className="group relative flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300 active:bg-neutral-300"
      style={{
        backgroundColor: `${historyId === explained.id ? "#d4d4d4" : ""}`,
      }}
      onClick={(e) => {
        e.stopPropagation();

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
          className="z-20 rounded-2xl bg-neutral-200 px-2 py-4"
        >
          <div
            onClick={() => setIsDeleteModalOpen(true)}
            className="rounded-xl px-3 py-2 text-sm tracking-wide hover:bg-neutral-300"
          >
            Delete
          </div>
          <div
            onClick={() => setIsAddToCollectionModalOpen(true)}
            className="rounded-xl px-3 py-2 text-sm tracking-wide hover:bg-neutral-300"
          >
            Add to Collection
          </div>
        </div>
      )}

      <Modal
        isOpen={isDeleteModalOpen}
        onConfirm={onDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
        }}
      >
        Are you sure you want to delete this item?
      </Modal>

      <Modal
        isOpen={isAddToCollectionModalOpen}
        onClose={() => {
          setIsAddToCollectionModalOpen(false);
        }}
        onConfirm={onAddExplainToCollection}
        confirmColor="green"
      >
        <div className="flex flex-col gap-2">
          <label>Select collection:</label>
          <div className="rounded-xl border-1 p-2">
            {!collectionsLoading && (
              <select
                value={selectedCollection}
                onChange={(e) => setSelectedCollection(e.target.value)}
                className="w-full cursor-pointer outline-none"
              >
                <option value="" disabled>
                  Select Category
                </option>
                {collections.map((collection, i) => (
                  <option key={i} value={collection.name.toLowerCase()}>
                    {collection.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default HistoryTab;
