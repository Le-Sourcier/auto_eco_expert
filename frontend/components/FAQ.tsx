import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

interface FAQQuestion {
  q: string;
  a: string;
}

const FAQ = () => {
  const { t } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // Ensure questions is always an array
  const questions = (t('faq.questions', { returnObjects: true }) || []) as FAQQuestion[];

  // If questions is empty, show a fallback message
  if (!Array.isArray(questions) || questions.length === 0) {
    return (
      <section id="faq" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="container-custom relative text-center">
          <p className="text-[var(--primary-600)]">Loading FAQ content...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--primary-50)] rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[var(--secondary-50)] rounded-full -translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-50)] rounded-full mb-6">
            <HelpCircle size={32} className="text-[var(--primary-600)]" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-800)] mb-6">
            {t('faq.title')}
          </h2>
          <div className="w-24 h-1 bg-[var(--secondary-500)] mx-auto mb-8" />
          <p className="text-xl text-[var(--primary-600)] max-w-2xl mx-auto">
            Trouvez rapidement des réponses à vos questions
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {questions.map((question: FAQQuestion, index: number) => (
            <motion.div
              key={index}
              className="mb-6"
              initial={false}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className={`w-full flex items-center justify-between p-6 rounded-xl transition-all ${
                  openIndex === index 
                    ? 'bg-[var(--primary-700)] text-white shadow-lg'
                    : 'bg-white text-[var(--primary-800)] shadow-md hover:shadow-lg'
                }`}
              >
                <span className="text-lg font-medium">
                  {question.q}
                </span>
                {openIndex === index ? (
                  <Minus className={openIndex === index ? 'text-white' : 'text-[var(--secondary-500)]'} />
                ) : (
                  <Plus className={openIndex === index ? 'text-white' : 'text-[var(--secondary-500)]'} />
                )}
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 bg-white border border-gray-100 rounded-b-xl shadow-inner">
                      <p className="text-[var(--primary-600)] leading-relaxed">
                        {question.a}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;