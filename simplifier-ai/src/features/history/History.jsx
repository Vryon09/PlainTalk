import { HistoryIcon } from "lucide-react";
import HistoryTab from "./HistoryTab";
import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";
import { getExplained } from "../../services/apiExplain";
import { useQuery } from "@tanstack/react-query";

//replace the data from the redux slice to the firestore datas

function History({ setHistoryOpen, historyOpen, isMobile }) {
  const navigate = useNavigate();
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
      className="absolute top-0 left-0 z-20 flex h-[100dvh] w-full flex-col overflow-hidden border-r border-neutral-200 bg-neutral-100 p-4 transition duration-500 md:z-0 md:w-70"
    >
      <div className="mb-2 flex h-10 items-center">
        <button
          onClick={() => setHistoryOpen(false)}
          className="cursor-pointer"
        >
          <HistoryIcon size={24} strokeWidth={2} />
        </button>
      </div>

      <div className="">
        <div
          className="cursor-pointer rounded-xl p-2 hover:bg-neutral-200"
          onClick={() => {
            if (isMobile) {
              setHistoryOpen(false);
            }

            navigate("/main/explainer");
          }}
        >
          <Logo type="small" />
        </div>

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
    </div>
  );
}

export default History;
