import History from "../history/History";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../../ui/Header";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../services/firebase";
import { TailSpin } from "react-loader-spinner";

function Main() {
  const [historyOpen, setHistoryOpen] = useState(false);
  const [user, loading] = useAuthState(auth);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (loading)
    return (
      <div className="mt-10 flex items-center justify-center">
        <TailSpin
          height="60"
          width="60"
          color="#4f39f6"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );

  return (
    <div className="flex">
      <History
        isMobile={isMobile}
        setHistoryOpen={setHistoryOpen}
        historyOpen={historyOpen}
      />

      <div
        className="z-10 min-h-[100dvh] grow space-y-4 bg-neutral-50 p-4"
        style={
          isMobile
            ? {}
            : {
                marginLeft: `${historyOpen ? "17.5rem" : "0"}`,
                transition: "0.5s",
              }
        }
      >
        <Header
          historyOpen={historyOpen}
          setHistoryOpen={setHistoryOpen}
          user={user}
        />

        <Outlet context={{ historyOpen, setHistoryOpen }} />
      </div>
    </div>
  );
}

export default Main;
