import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import Message from "./Message";
import LeadForm from "./LeadForm";
import "./Chatbot.css";
import useAuth from "../../services/hooks/useAuth";
import { ChatMessage } from "../../services/types";
import ChatForm from "./chatForm";

const Chatbot = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [carType, setCarType] = useState("");
  const [budget, setBudget] = useState("");
  const [needHelp, setNeedHelp] = useState(false);
  const [financing, setFinancing] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const { lead, createLead } = useAuth();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const startConversation = async () => {
    if (!lead || lead.email) {
      addBotMessage(t("chatbot.welcome"));
      setTimeout(() => {
        addBotMessage(t("chatbot.carType"), "buttons", [
          t("chatbot.carTypeNew"),
          t("chatbot.carTypeUsed"),
        ]);
      }, 1000);
    } else {
      // addBotMessage(t("chatbot.welcome"));
      // setTimeout(() => {
      //   addBotMessage(t("chatbot.carType"), "buttons", [
      //     t("chatbot.carTypeNew"),
      //     t("chatbot.carTypeUsed"),
      //   ]);
      // }, 1000);
    }
  };

  const addBotMessage = (
    content: string,
    type: "text" | "buttons" | "input" = "text",
    options: string[] = []
  ) => {
    setIsTyping(true);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: Date.now().toString(),
          content,
          isBot: true,
          options,
          type,
        },
      ]);
      setIsTyping(false);
    }, 700);
  };

  const addUserMessage = (content: string) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        content,
        isBot: false,
      },
    ]);
  };

  const handleCarTypeSelect = (option: string) => {
    addUserMessage(option);
    setCarType(option);
    setCurrentStep(1);

    setTimeout(() => {
      addBotMessage(t("chatbot.budget"), "input");
    }, 700);
  };

  const handleBudgetSubmit = (budgetValue: string) => {
    addUserMessage(`${budgetValue}€`);
    setBudget(budgetValue);
    setCurrentStep(2);

    setTimeout(() => {
      addBotMessage(t("chatbot.financing"), "buttons", [
        t("chatbot.financingCredit"),
        t("chatbot.financingLease"),
        t("chatbot.financingCash"),
      ]);
    }, 700);
  };
  const handleOtherHelp = (value: string) => {
    addUserMessage(value);
    setNeedHelp(value === "Oui");
    // if (needHelp) setCurrentStep(4);
    // else setNeedHelp(false);

    setTimeout(() => {
      addBotMessage("Besoin d'autre chose?", "buttons", ["Oui", "Non"]);
    }, 700);
    // if (value === "non") {
    //   setTimeout(() => {
    //     addBotMessage("Tres bien je suis si besoin,", "text");
    //   }, 700);
    // }
  };

  const handleStartDiscu = (value: string) => {
    addUserMessage(value);
    // setNeedHelp(true);
    // setCurrentStep(4);
  };

  const finacialOptionKey = (key: string) => {
    switch (key) {
      case "Crédit":
      case "Crédito":
      case "Credit":
      case "Kredit":
        key = "credit";
        break;
      case "LOA/LLD":
      case "Leasing":
      case "sss":
        key = "leasing";
        break;
      case "Achat comptant":
      case "Compra al contado":
      case "Cash purchase":
      case "Barkauf":
        key = "cash";
        break;

      default:
        key = "credit";
        break;
    }
    return key;
  };

  const handleFinancingSelect = (option: string) => {
    addUserMessage(option);
    setFinancing(option);
    setCurrentStep(3);

    const offerCount = Math.floor(Math.random() * 8) + 5; // Random between 5-12

    setTimeout(() => {
      addBotMessage(t("chatbot.leadCapture", { count: offerCount }));

      setTimeout(() => {
        const benefits = t("chatbot.leadBenefits", {
          returnObjects: true,
        }) as string[];

        benefits.forEach((benefit, index) => {
          setTimeout(() => {
            addBotMessage(benefit);
          }, 700 * (index + 1));
        });

        setTimeout(() => {
          addBotMessage(t("chatbot.confirmationText"));
          setShowLeadForm(true);
        }, 700 * (benefits.length + 1));
      }, 1000);
    }, 700);
  };

  const handleSubmitLead = async (
    firstName: string,
    email: string,
    phone: string
  ) => {
    // Here we would normally send the data to the backend
    // console.log({ firstName, email, phone, carType, budget, financing });

    setShowLeadForm(false);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Date.now().toString(),
        content: "Confirmer",
        isBot: false,
        options: [],
        type: "text",
      },
    ]);
    if (!lead) {
      const res = await createLead({
        first_name: firstName,
        email,
        phone,
        car_type: carType,
        budget,
        financing_type: finacialOptionKey(financing),
        language: "fr",
      });

      console.log("LEAD: ", res.data);
      setIsTyping(true);

      if (res.error) {
        setTimeout(() => {
          addBotMessage(t("chatbot.errorSubmission"));
          addBotMessage(t("chatbot.tryAgain"));
          setShowLeadForm(true);
        }, 10000);
      } else {
        addBotMessage(t("chatbot.thanks"));

        setTimeout(() => {
          addBotMessage(t("chatbot.successSubmission"));
          setShowLeadForm(false);
        }, 10000);
        setTimeout(() => {
          setShowLeadForm(false);
          setTimeout(() => {
            handleOtherHelp(needHelp ? "Oui" : "Non");
          }, 700);
        }, 10000);
      }
    }
    // // Reset conversation after some time
    // setTimeout(async () => {
    //   setIsOpen(false);
    //   setMessages([]);
    //   setCurrentStep(0);
    //   setCarType("");
    //   setBudget("");
    //   setFinancing("");
    //   // Submit the lead form data to the backend

    // });
  };

  return (
    <>
      {/* Chatbot trigger button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 bg-[var(--secondary-500)] text-[var(--primary-800)] p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 z-50"
      >
        <MessageSquare size={24} />
      </button>

      {/* Chatbot window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="chatbot-window"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div className="chatbot-header">
              <div>
                <h3 className="font-bold text-lg">{t("chatbot.title")}</h3>
                <p className="text-sm opacity-80">{t("chatbot.subtitle")}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-[var(--primary-600)]"
              >
                <X size={20} />
              </button>
            </div>
            <div className="chatbot-messages">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message}
                  onButtonClick={
                    currentStep === 0
                      ? handleCarTypeSelect
                      : currentStep === 2
                      ? handleFinancingSelect
                      : currentStep === 4
                      ? handleOtherHelp
                      : () => {}
                  }
                  onInputSubmit={
                    currentStep === 1 ? handleBudgetSubmit : () => {}
                  }
                />
              ))}

              {isTyping && (
                <div className="message bot">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
            {needHelp && <ChatForm onSubmit={handleStartDiscu} />}
            {showLeadForm && <LeadForm onSubmit={handleSubmitLead} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
