import { useState } from "react";
import { useTranslation } from "react-i18next";

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
      //
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <div className="form-group">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder={t("chatbot.firstName")}
          className={errors.firstName ? "error" : ""}
        />
        {errors.firstName && (
          <span className="error-message">{errors.firstName}</span>
        )}
      </div>

      <div className="form-group">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("chatbot.email")}
          className={errors.email ? "error" : ""}
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={t("chatbot.phone")}
        />
      </div>

      <button type="submit" className="submit-button">
        {t("chatbot.submit")}
      </button>
    </form>
  );
};

export default LeadForm;
