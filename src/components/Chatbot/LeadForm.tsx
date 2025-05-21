import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { User, Mail, Phone } from "lucide-react";

interface LeadFormProps {
  onSubmit: (firstName: string, email: string, phone: string) => void;
}

const LeadForm = ({ onSubmit }: LeadFormProps) => {
  const { t } = useTranslation();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<{
    firstName?: string;
    email?: string;
  }>({});

  const validate = () => {
    const newErrors: {
      firstName?: string;
      email?: string;
    } = {};

    if (!firstName.trim()) {
      newErrors.firstName = "Le prénom est requis";
    }

    if (!email.trim()) {
      newErrors.email = "L'email est requis";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Email invalide";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(firstName, email, phone);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="lead-form"
    >
      <div className="form-group">
        <div className="relative">
          <User
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder={t("chatbot.firstName")}
            className={`pl-14 ${errors.firstName ? "error" : ""}`}
          />
        </div>
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <div className="relative gap-2">
          <Mail
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("chatbot.email")}
            className={`pl-10  placeholder:pl-6 ${errors.email ? "error" : ""}`}
          />
        </div>
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <div className="relative">
          <Phone
            size={18}
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          />
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder={t("chatbot.phone")}
            className="pl-10"
          />
        </div>
      </div>

      <button type="submit" className="submit-button group">
        {t("chatbot.submit")}
        <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
          →
        </span>
      </button>
    </motion.form>
  );
};

export default LeadForm;
