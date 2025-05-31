import { HistoryIcon } from "lucide-react";

function HideHistory({ onClick }) {
  return (
    <div className="mb-2 flex min-h-10 items-center">
      <button onClick={onClick} className="cursor-pointer">
        <HistoryIcon size={24} strokeWidth={2} />
      </button>
    </div>
  );
}

export default HideHistory;
