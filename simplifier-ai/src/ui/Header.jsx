import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import { HistoryIcon, LogOut } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import Modal from "./Modal";
import { useState } from "react";

function Header({ historyOpen, setHistoryOpen, user }) {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  async function handleLogout() {
    try {
      navigate("/");
      await signOut(auth);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex h-10 items-center gap-2">
        {!historyOpen && (
          <button
            className="cursor-pointer"
            onClick={() => setHistoryOpen(true)}
          >
            <HistoryIcon size={24} strokeWidth={2} />
          </button>
        )}

        <span
          className="cursor-pointer"
          onClick={() => navigate("/main/explainer")}
        >
          <Logo type="primary" />
        </span>
      </div>

      <div className="flex gap-4">
        <div className="h-8 w-8 cursor-pointer overflow-hidden rounded-full bg-neutral-600">
          <img className="w-full" src={user.photoURL} alt={user.displayName} />
        </div>
        <button
          className="cursor-pointer"
          onClick={() => setIsLogoutModalOpen(true)}
        >
          <LogOut size={20} strokeWidth={2} />
        </button>
      </div>
      <Modal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
      >
        Do you really want to go?
      </Modal>
    </div>
  );
}

export default Header;
