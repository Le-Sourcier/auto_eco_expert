import { useState } from "react";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";

interface MessageProps {
  message: {
    content: string;
    isBot: boolean;
    options?: string[];
    type?: "text" | "buttons" | "input";
  };
  onButtonClick: (option: string) => void;
  onInputSubmit: (value: string) => void;
}

const Message = ({ message, onButtonClick, onInputSubmit }: MessageProps) => {
  const [inputValue, setInputValue] = useState("15000");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onInputSubmit(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`message ${message.isBot ? "bot" : "user"}`}
    >
      <div className="message-content">{message.content}</div>

      {message.type === "buttons" && message.options && (
        <ActionButtons
          options={message.options}
          onButtonClick={onButtonClick}
        />
      )}

      {message.type === "input" && (
        <form onSubmit={handleInputSubmit} className="mt-3">
          <div className="flex items-center">
            <input
              type="range"
              min="5000"
              max="50000"
              step="1000"
              value={inputValue}
              onChange={handleInputChange}
              className="w-4/5 mr-3"
            />
            <span className="text-lg font-semibold">{inputValue}€</span>
          </div>
          <div className="flex justify-between text-xs text-gray-500 px-1 mt-1">
            <span>5 000€</span>
            <span>50 000€</span>
          </div>
          <button
            type="submit"
            className="mt-2 w-full bg-[var(--secondary-500)] text-[var(--primary-800)] font-medium py-2 px-4 rounded-md hover:bg-[var(--secondary-600)] transition-colors"
          >
            Confirmer
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default Message;
