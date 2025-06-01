import { ChevronDown, ChevronUp, Folder, X } from "lucide-react";
import { useState } from "react";
import CollectionItem from "./CollectionItem";

function Collection({ isMobile, collection }) {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div>
      <div className="flex h-9 cursor-default items-center justify-between">
        <p className="flex items-center justify-between gap-2 text-sm text-neutral-600">
          <Folder size={14} /> <span>{collection.name}</span>
        </p>
        <button
          onClick={() => setIsDropped(!isDropped)}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full text-neutral-600 transition-all duration-100 group-hover:flex hover:bg-neutral-200 active:bg-neutral-200"
        >
          {isDropped ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isDropped && (
        <div className="space-y-1">
          {collection.explained.map((explained, i) => (
            <CollectionItem
              key={explained.id}
              isMobile={isMobile}
              explained={explained}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Collection;
