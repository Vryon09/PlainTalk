import { useEffect, useRef, useState } from "react";
import HistoryTab from "./HistoryTab";

function RecentHistory({ isPending, prevExplained, isMobile, setHistoryOpen }) {
  const [tabDropped, setTabDropped] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setTabDropped(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div>
      <p className="pt-4 text-sm font-semibold text-neutral-500">
        Recent History
      </p>

      <div className="flex flex-col-reverse gap-1 py-2">
        {isPending && (
          <p className="mt-2 text-center text-neutral-400">Loading...</p>
        )}

        {!isPending && !prevExplained.length && (
          <p className="mt-2 text-center text-neutral-400">No history here</p>
        )}

        {!isPending &&
          prevExplained.length > 0 &&
          prevExplained.map((explained) => (
            <HistoryTab
              tabDropped={tabDropped}
              setTabDropped={setTabDropped}
              isMobile={isMobile}
              setHistoryOpen={setHistoryOpen}
              explained={explained}
              dropdownRef={dropdownRef}
              key={explained.id}
            />
          ))}
      </div>
    </div>
  );
}

export default RecentHistory;
