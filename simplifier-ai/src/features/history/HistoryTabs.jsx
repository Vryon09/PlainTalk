import { useQuery } from "@tanstack/react-query";
import { getCollections } from "../../services/apiHistory";
import Collections from "./Collections";
import LogoTab from "./LogoTab";
import RecentHistory from "./RecentHistory";

function HistoryTabs({ isMobile, setHistoryOpen, isPending, prevExplained }) {
  const { data: collections, isPending: collectionsLoading } = useQuery({
    queryKey: ["collections"],
    queryFn: getCollections,
  });

  return (
    <div>
      <LogoTab isMobile={isMobile} setHistoryOpen={setHistoryOpen} />

      <Collections
        isMobile={isMobile}
        collections={collections}
        isPending={collectionsLoading}
      />

      <RecentHistory
        isMobile={isMobile}
        setHistoryOpen={setHistoryOpen}
        isPending={isPending}
        prevExplained={prevExplained}
        collections={collections}
        collectionsLoading={collectionsLoading}
      />
    </div>
  );
}

export default HistoryTabs;
