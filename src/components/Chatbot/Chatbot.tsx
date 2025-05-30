import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Cookies from "js-cookie";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X } from "lucide-react";
import Message from "./Message";
import LeadForm from "./LeadForm";
import "./Chatbot.css";
import useAuth from "../../services/hooks/useAuth";
import { ChatMessage } from "../../services/types";
import ChatForm from "./chatForm";
import { useChatStore } from "../../services/store/chatStore";

const Chatbot = ({ onOpen }: { onOpen?: () => void }) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [carType, setCarType] = useState("");
  const [budget, setBudget] = useState("");
  // const [needHelp, setNeedHelp] = useState(false);
  const [financing, setFinancing] = useState("");
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [showChatInput, setShowChatInput] = useState(false);
  const { lead, createLead, message: msg } = useAuth();
  const { isLoading, getMessage, sendMessage, analyze } = useChatStore();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const initialMessages = async () => {
      if (lead) {
        const message = await getMessage(lead.id);
        setMessages(message);
        setTimeout(() => {
          setShowChatInput(true);
        }, 1000);

        if (message.length <= 0) {
          setTimeout(() => {
            addBotMessage(
              t("chatbot.WELCOME_BACK", { first_name: lead.first_name }),
              "text"
            );
          }, 3000);
        }
      }
    };

    initialMessages();
  }, [getMessage, lead, t]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      startConversation();
      onOpen?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const startConversation = async () => {
    if (!lead || !lead.email) {
      addBotMessage(t("chatbot.welcome"));
      setTimeout(() => {
        addBotMessage(t("chatbot.carType"), "buttons", [
          t("chatbot.carTypeNew"),
          t("chatbot.carTypeUsed"),
        ]);
      }, 1000);
    } else {
      messages.forEach((message) => {
        sendMessage(message);
      });
      setTimeout(() => {
        setShowChatInput(true);
      }, 1000);
    }
  };

  const addBotMessage = (
    content: string,
    type:
      | "text"
      | "buttons"
      | "input"
      | "success"
      | "contact"
      | "recovery"
      | "error" = "text",
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

  const goToBudgetStep = () => {
    setCurrentStep(1);
    setBudget("");
    addBotMessage(t("chatbot.budget"), "input");
  };

  const handleRetrySearch = async (value: string) => {
    addUserMessage(value);
    const input = value.trim().toLowerCase();

    const isYes = ["yes", "oui", "ja", "sí"].includes(input);
    if (isYes) {
      setTimeout(() => {
        addBotMessage(t("chatbot.getRestart"));
        setTimeout(goToBudgetStep, 800);
      }, 700);
      setTimeout(() => setShowLeadForm(false), 700);
    } else {
      const _ = ["chatbot.thankYouFeedback", "chatbot.inviteToRetryWithInfo"];
      _.forEach((itm, index) => {
        setTimeout(() => {
          addBotMessage(t(itm));
          setTimeout(() => setShowLeadForm(true), 700);
        }, 300 + 500 / index);
      });
    }
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

  // const handleOtherHelp = (value: string) => {
  //   addUserMessage(value);
  //   // setTimeout(() => {
  //   //   if (value === "Oui") {
  //   //     setShowChatInput(true);
  //   //     addBotMessage("Comment puis-je vous aider ?", "text");
  //   //   } else {
  //   //     addBotMessage(
  //   //       "Merci de votre confiance ! N'hésitez pas à revenir si vous avez d'autres questions.",
  //   //       "success"
  //   //     );
  //   //   }
  //   // }, 700);
  // };

  const handleStartDiscu = async (value: string) => {
    addUserMessage(value);
    setTimeout(() => {
      // messages.forEach((message) => {
      // return addBotMessage();
      // });
    }, 700);

    // setTimeout(() => {
    //   messages.forEach((message) => {
    //     await sendMessage(message);
    //   });
    // }, 700);

    if (lead) {
      const gtm = await sendMessage({
        content: value,
        type: "text",
        id: lead.id,
        isBot: false,
      });

      addBotMessage(gtm.content, gtm.type);
    }
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

  const carTypeOptionKey = (input: string): "new" | "used" => {
    if (input.includes("50%")) {
      return "used";
    }
    if (input.includes("30%")) {
      return "new";
    }
    return "new"; // Valeur par défaut
  };

  const handleFinancingSelect = (option: string) => {
    addUserMessage(option);
    setFinancing(option);
    setCurrentStep(3);

    addBotMessage(t("chatbot.great"), "success");

    setTimeout(() => {
      addBotMessage(t("chatbot.startAnalyzing"), "text");

      if (isLoading) {
        setIsTyping(true);
      }
      // Simulated analysis results
      setTimeout(async () => {
        const res = await analyze({
          car_type: carTypeOptionKey(carType),
          budget: budget,
          financing_type: finacialOptionKey(financing),
        });
        const recommendations = [
          ...res.data,
          // "✨ Une Peugeot 208 d'occasion avec seulement 25 000 km",
          // "🌟 Une Renault Clio neuve avec une remise de 15%",
          // "💫 Une Citroën C3 récente sous garantie",
        ];

        if (recommendations.length > 0) {
          // addBotMessage(
          //   t("chatbot.leadCapture", { count: recommendations.length })
          // );

          addBotMessage(res.message.replaceAll("*", ""));

          recommendations.slice(0, 5).forEach((sgt, index) => {
            setTimeout(() => {
              // addBotMessage(rec.model, "text");

              const message = t("chatbot.previewMessage", {
                // make: sgt.make,
                model: sgt.model,
                motor: sgt.motor,
                fuel: sgt.fuel,
                gearbox: sgt.gearbox,
                km: sgt.km.toLocaleString(),
                priceCash: sgt.priceCash.toLocaleString(),
                discount: sgt.discountPct
                  ? t("chatbot.discountText", { percent: sgt.discountPct })
                  : "",
                // year: sgt.year,
                // // age: sgt.age,
                // monthly: sgt.priceFrom
                //   ? " – " +
                //     t("chatbot.monthlyFrom", {
                //       amount: sgt.priceFrom.toLocaleString(),
                //     })
                //   : "",
              });
              addBotMessage(message, "text");
            }, 700 * (index + 1));
          });

          setTimeout(() => {
            addBotMessage(t("chatbot.confirmationText"), "text");
            setShowLeadForm(true);
          }, 700 * (recommendations.length + 1));
        } else {
          setTimeout(() => {
            addBotMessage(t("chatbot.noOfferMatch"), "buttons", [
              t("chatbot.yes"),
              t("chatbot.no"),
            ]);
            setCurrentStep(4);
          }, 1000);
        }
      }, 2000);
    }, 700);
  };

  const handleSubmitLead = async (
    firstName: string,
    email: string,
    phone: string
  ) => {
    try {
      setShowLeadForm(false);

      addUserMessage(t("chatbot.CONTACT_DETAILS_SENT"));
      setIsTyping(true);

      const savedLang =
        Cookies.get("i18next") || localStorage.getItem("i18next");

      const res = await createLead({
        first_name: firstName,
        email,
        phone,
        car_type: carType,
        budget,
        financing_type: finacialOptionKey(financing),
        language: savedLang,
      });

      if (res.error) {
        if (msg && msg == "ACCOUNT_ALREADY_EXISTS")
          setTimeout(() => {
            addBotMessage(
              t(msg, { email: email.slice(0, 5) + " ..." }),
              "recovery"
            );
            setShowLeadForm(false);
          }, 1000);
        else {
          addBotMessage(t("chatbot.errorSubmission"), "error");

          setTimeout(() => {
            addBotMessage(t("chatbot.tryAgain"), "text");
            setShowLeadForm(true);
          }, 1000);
        }
      } else {
        addBotMessage(t("chatbot.thanks"), "success");
        setTimeout(() => {
          addBotMessage(t("chatbot.successSubmission"), "success");
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      addBotMessage(t("chatbot.errorSubmission"), "error");
      setTimeout(() => {
        setShowLeadForm(true);
      }, 1000);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <>
      <AnimatePresence>
        <motion.button
          onClick={() => {
            setIsOpen(!isOpen);
            onOpen?.();
          }}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-[var(--secondary-500)] to-[var(--secondary-600)] text-[var(--primary-800)] p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:scale-105 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <MessageSquare size={24} />
        </motion.button>

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
                onClick={() => {
                  setIsOpen(false);
                  onOpen?.();
                }}
                className="p-2 rounded-full hover:bg-[var(--primary-600)] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="chatbot-messages">
              {messages.map((message) => (
                <>
                  {/* {message.id} */}
                  <Message
                    key={message.id}
                    message={message}
                    onButtonClick={
                      currentStep === 0
                        ? handleCarTypeSelect
                        : currentStep === 2
                        ? handleFinancingSelect
                        : currentStep === 4
                        ? handleRetrySearch
                        : // : currentStep === 4
                          // ? handleOtherHelp
                          () => {}
                    }
                    onInputSubmit={(value) => {
                      switch (currentStep) {
                        case 1:
                          return handleBudgetSubmit(value);
                        case 4:
                          return handleRetrySearch(value);
                        default:
                          return;
                      }
                    }}
                  />
                </>
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

            {showChatInput && <ChatForm onSubmit={handleStartDiscu} />}
            {showLeadForm && <LeadForm onSubmit={handleSubmitLead} />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
