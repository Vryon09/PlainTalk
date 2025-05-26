import HistoryTab from "./HistoryTab";
import LogoTab from "./LogoTab";

function HistoryTabs({ isMobile, setHistoryOpen, isPending, prevExplained }) {
  return (
    <div>
      <LogoTab isMobile={isMobile} setHistoryOpen={setHistoryOpen} />

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
              isMobile={isMobile}
              setHistoryOpen={setHistoryOpen}
              key={explained.id}
              explained={explained}
            />
          ))}
      </div>
    </div>
  );
}

export default HistoryTabs;
