import { Send } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { t } from "i18next";

interface ChatFormProps {
  onSubmit: (message: string) => void;
}

const ChatForm = ({ onSubmit }: ChatFormProps) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const trimmed = message.trim();
    if (!trimmed) return;

    onSubmit(trimmed);
    setMessage("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="chat-form"
    >
      <div className="relative">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t("common.typeMessage")}
          className="chat-input pr-12"
        />
        <button
          type="submit"
          disabled={!message.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-[var(--primary-600)] text-white p-2 rounded-full transition-all hover:bg-[var(--primary-700)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Send size={18} />
        </button>
      </div>
    </motion.form>
  );
};

export default ChatForm;
