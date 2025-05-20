import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

const LandingPage = () => {
  const { t } = useTranslation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  
  const handleStartChat = () => {
    setIsChatbotOpen(true);
  };
  
  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      
      <Header />
      <Hero onStartChat={handleStartChat} />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Footer />
      
      <Chatbot isOpen={isChatbotOpen} onClose={() => setIsChatbotOpen(false)} />
    </>
  );
};

export default LandingPage;