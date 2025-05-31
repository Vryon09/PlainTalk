import Collections from "./Collections";
import LogoTab from "./LogoTab";
import RecentHistory from "./RecentHistory";

function HistoryTabs({ isMobile, setHistoryOpen, isPending, prevExplained }) {
  return (
    <div>
      <LogoTab isMobile={isMobile} setHistoryOpen={setHistoryOpen} />

      <Collections isMobile={isMobile} />

      <RecentHistory
        isMobile={isMobile}
        setHistoryOpen={setHistoryOpen}
        isPending={isPending}
        prevExplained={prevExplained}
      />
    </div>
  );
}

export default HistoryTabs;
