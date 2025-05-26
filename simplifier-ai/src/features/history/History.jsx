import { getExplained } from "../../services/apiExplain";
import { useQuery } from "@tanstack/react-query";
import HideHistory from "./HideHistory";
import HistoryTabs from "./HistoryTabs";

//replace the data from the redux slice to the firestore datas

function History({ setHistoryOpen, historyOpen, isMobile }) {
  // const prevExplained = useSelector(getPrevExplained);
  const { data: prevExplained, isPending } = useQuery({
    queryKey: ["explained"],
    queryFn: getExplained,
  });

  return (
    <div
      style={
        isMobile
          ? {
              left: `${historyOpen ? 0 : "-100%"}`,
              transition: "0.5s",
              position: "fixed",
            }
          : {}
      }
      className="absolute top-0 left-0 z-20 flex h-[100dvh] w-full flex-col overflow-hidden overflow-scroll border-r border-neutral-200 bg-neutral-100 p-4 transition duration-500 md:z-0 md:w-70"
    >
      <HideHistory onClick={() => setHistoryOpen(false)} />

      <HistoryTabs
        isMobile={isMobile}
        setHistoryOpen={setHistoryOpen}
        isPending={isPending}
        prevExplained={prevExplained}
      />
    </div>
  );
}

export default History;
