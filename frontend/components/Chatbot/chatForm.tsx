import { Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatFormProps {
  onSubmit: (message: string) => void;
}

const ChatForm = ({ onSubmit }: ChatFormProps) => {
  const { t } = useTranslation();
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setMessage(""); // Clear input after sending
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder={"Type your message"}
        className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />
      <button
        type="submit"
        disabled={!message.trim()}
        className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 text-white rounded-full p-2 transition"
      >
        <Send size={20} />
      </button>
    </form>
  );
};

export default ChatForm;
