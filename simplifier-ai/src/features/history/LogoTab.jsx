import { useNavigate } from "react-router-dom";
import Logo from "../../ui/Logo";

function LogoTab({ isMobile, setHistoryOpen }) {
  const navigate = useNavigate();

  return (
    <div
      className="cursor-pointer rounded-xl p-2 hover:bg-neutral-200 active:bg-neutral-200"
      onClick={() => {
        if (isMobile) {
          setHistoryOpen(false);
        }

        navigate("/main/explainer");
      }}
    >
      <Logo type="small" />
    </div>
  );
}

export default LogoTab;
