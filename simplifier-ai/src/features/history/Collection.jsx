import { ChevronDown, ChevronUp, Folder, X } from "lucide-react";
import { useState } from "react";

function Collection({ isMobile }) {
  const [isDropped, setIsDropped] = useState(false);

  return (
    <div>
      <div className="flex h-9 cursor-default items-center justify-between">
        <p className="flex items-center justify-between gap-2 text-sm text-neutral-600">
          <Folder size={14} /> <span>48 laws of power</span>
        </p>
        <button
          onClick={() => setIsDropped(!isDropped)}
          className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-200 active:bg-neutral-200"
        >
          {isDropped ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
      </div>

      {isDropped && (
        <div className="space-y-1">
          <div className="group flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300 active:bg-neutral-300">
            <p className="text-sm">law 1</p>{" "}
            <button
              style={isMobile ? { display: "flex" } : {}}
              className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400 active:bg-neutral-400"
            >
              <X size={14} />
            </button>
          </div>

          <div className="group flex h-9 cursor-pointer items-center justify-between rounded-xl bg-neutral-200 p-2 hover:bg-neutral-300 active:bg-neutral-300">
            <p className="text-sm">law 4</p>

            <button
              style={isMobile ? { display: "flex" } : {}}
              className="hidden h-6 w-6 cursor-pointer items-center justify-center rounded-full transition-all duration-100 group-hover:flex hover:bg-neutral-400 active:bg-neutral-400"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collection;
