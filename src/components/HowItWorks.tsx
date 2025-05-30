import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, BarChart as ChartBar, Shield } from "lucide-react";

const HowItWorks = () => {
  const { t } = useTranslation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const steps = [
    {
      icon: Brain,
      color: "primary",
      title: t("howItWorks.step1.title"),
      description: t("howItWorks.step1.description"),
    },
    {
      icon: ChartBar,
      color: "primary",
      title: t("howItWorks.step2.title"),
      description: t("howItWorks.step2.description"),
    },
    {
      icon: Shield,
      color: "primary",
      title: t("howItWorks.step3.title"),
      description: t("howItWorks.step3.description"),
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="comment-ca-marche"
      ref={ref}
      className="py-24 px-4 bg-white relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--primary-50)] rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--secondary-50)] rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-800)] mb-6">
            {t("howItWorks.title")}
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary-500)] mx-auto mb-8" />
          <p className="text-xl text-[var(--primary-600)] max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={item}
              className="relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div
                className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center bg-[var(--${step.color}-600)] text-white shadow-lg`}
              >
                <step.icon size={32} />
              </div>

              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold text-[var(--primary-800)] mb-4">
                  {step.title}
                </h3>
                <p className="text-[var(--primary-600)] leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;
