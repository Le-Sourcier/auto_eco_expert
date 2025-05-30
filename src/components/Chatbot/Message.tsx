import { useState, useRef } from "react";
import { motion } from "framer-motion";
import ActionButtons from "./ActionButtons";
import { Euro } from "lucide-react";
import { t } from "i18next";

interface MessageProps {
  message: {
    content: string;
    isBot: boolean;
    options?: string[];
    type?:
      | "text"
      | "buttons"
      | "input"
      | "success"
      | "error"
      | "contact"
      | "recovery";
  };
  onButtonClick: (option: string) => void;
  onInputSubmit: (value: string) => void;
}

const Message = ({ message, onButtonClick, onInputSubmit }: MessageProps) => {
  const [inputValue, setInputValue] = useState("15000");
  const [dateTime, setDateTime] = useState("");
  const [codeSegments, setCodeSegments] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
  ]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTime(e.target.value);
  };

  const handleInputSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onInputSubmit(inputValue);
    }
  };
  const handleDateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dateTime) {
      onInputSubmit(dateTime);
    }
  };
  const handleCodeChange = (index: number, value: string) => {
    if (!/^[0-9]?$/.test(value)) return;
    const newSegments = [...codeSegments];
    newSegments[index] = value;
    setCodeSegments(newSegments);
    if (value && inputsRef.current[index + 1]) {
      inputsRef.current[index + 1]?.focus();
    }
  };
  const handleCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const code = codeSegments.join("");
    if (code.length === 5) {
      onInputSubmit(code);
    }
  };

  const messageClass = `message ${message.isBot ? "bot" : "user"} ${
    message.type === "success"
      ? "success"
      : message.type === "error"
      ? "error"
      : ""
  }`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={messageClass}
    >
      <div className="message-content whitespace-pre-line">
        {message.type === "success" && "✅ "}
        {message.type === "error" && "❌ "}
        {message.content}
      </div>

      {message.type === "buttons" && message.options && (
        <ActionButtons
          options={message.options}
          onButtonClick={onButtonClick}
        />
      )}

      {message.type === "input" && (
        <form onSubmit={handleInputSubmit} className="mt-4">
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="range"
                min="5000"
                max="50000"
                step="1000"
                value={inputValue}
                onChange={handleInputChange}
                className="w-4/5 mr-3 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-[var(--secondary-500)]"
              />
              <div className="flex items-center bg-white rounded-lg px-3 py-2 shadow-sm border border-gray-100">
                <span className="text-lg font-semibold text-[var(--primary-800)]">
                  {parseInt(inputValue).toLocaleString()}
                </span>
                <Euro size={16} className="ml-1 text-[var(--primary-600)]" />
              </div>
            </div>
            <div className="flex justify-between text-xs text-[var(--primary-600)] px-1">
              <span>5 000€</span>
              <span>50 000€</span>
            </div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-[var(--secondary-500)] to-[var(--secondary-600)] text-[var(--primary-800)] font-medium py-3 px-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
            >
              {t("chatbot.confirmBudget")}
            </button>
          </div>
        </form>
      )}
      {message.type === "contact" && (
        <form onSubmit={handleDateSubmit} className="mt-4 space-y-4">
          <input
            type="datetime-local"
            id="datetime"
            value={dateTime}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-lg border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-[var(--secondary-500)] focus:ring focus:ring-[var(--secondary-200)]"
          />
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[var(--secondary-500)] to-[var(--secondary-600)] text-[var(--primary-800)] font-medium py-3 px-4 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {t("chatbot.CONFIRM_SLOT")}
          </button>
        </form>
      )}
      {message.type === "recovery" && (
        <form
          onSubmit={handleCodeSubmit}
          className="mt-4 flex flex-col items-center space-y-4"
        >
          <div className="flex space-x-2">
            {codeSegments.map((seg, idx) => (
              <input
                key={idx}
                ref={(el) => (inputsRef.current[idx] = el)}
                type="text"
                maxLength={1}
                value={seg}
                onChange={(e) => handleCodeChange(idx, e.target.value)}
                className="w-[42px] h-[42px] text-center text-lg border rounded-lg border-gray-300 focus:border-[var(--secondary-500)] focus:ring focus:ring-[var(--secondary-200)]"
              />
            ))}
          </div>
          <button
            type="submit"
            className="w-full max-w-xs bg-gradient-to-r from-[var(--secondary-500)] to-[var(--secondary-600)] text-[var(--primary-800)] font-medium py-3 rounded-lg hover:shadow-md transition-all duration-300 transform hover:-translate-y-0.5"
          >
            {t("chatbot.CONFIRM_CODE")}
          </button>
        </form>
      )}
    </motion.div>
  );
};

export default Message;
