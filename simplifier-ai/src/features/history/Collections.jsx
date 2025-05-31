import { Plus } from "lucide-react";
import Collection from "./Collection";
import { useState } from "react";
import Modal from "../../ui/Modal";
import { getCollections, useAddCollection } from "../../services/apiHistory";
import { useQuery } from "@tanstack/react-query";

function Collections({ isMobile }) {
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [collectionNameInput, setCollectionNameInput] = useState("");
  const { data: collections, isPending } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });
  const { mutate: handleAddCollection } = useAddCollection();

  function onAddCollection() {
    if (collectionNameInput === "") return;
    handleAddCollection(collectionNameInput);
  }

  return (
    <div>
      <div className="mt-4 flex items-center justify-between text-neutral-500">
        <p className="text-sm font-semibold">Collections</p>
        <button
          onClick={() => setIsAddingNew(true)}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-200 active:bg-neutral-200"
        >
          <Plus size={16} />
        </button>
      </div>

      <div className="space-y-1 py-2">
        {isPending && (
          <p className="mt-2 text-center text-neutral-400">Loading...</p>
        )}

        {!isPending && !collections?.length && (
          <p className="mt-2 text-center text-neutral-400">
            No Collection here
          </p>
        )}

        {collections?.length > 0 &&
          collections.map((collection, i) => (
            <Collection key={i} collection={collection} isMobile={isMobile} />
          ))}

        <Modal
          isOpen={isAddingNew}
          onClose={() => setIsAddingNew(false)}
          onConfirm={onAddCollection}
          confirmColor="green"
        >
          <div className="flex flex-col gap-2">
            <label>Enter Collection Name:</label>
            <input
              value={collectionNameInput}
              onChange={(e) => setCollectionNameInput(e.target.value)}
              type="text"
              placeholder="Ex. School"
              className="rounded-md border-1 border-neutral-600 p-2"
            />
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default Collections;
