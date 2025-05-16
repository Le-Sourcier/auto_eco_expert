import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { HelmetProvider } from "react-helmet-async";
import LandingPage from "./pages/LandingPage";
import ThankYouPage from "./pages/ThankYouPage";
import PrivacyPolicy from "./pages/legal/PrivacyPolicy";
import TermsOfService from "./pages/legal/TermsOfService";
import CookiePolicy from "./pages/legal/CookiePolicy";
import GDPRPolicy from "./pages/legal/GDPRPolicy";
//import ScrollToTop from './components/ScrollToTop';
import "./i18n/i18n";
import "./index.css";
import { AuthProvider } from "./services/providers/authProvider";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const browserLang = navigator.language.split("-")[0];
    const supportedLangs = ["fr", "en", "es", "de"];
    const lang = supportedLangs.includes(browserLang) ? browserLang : "fr";

    i18n.changeLanguage(lang);
  }, [i18n]);

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          {/* <ScrollToTop /> */}
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/merci" element={<ThankYouPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/gdpr" element={<GDPRPolicy />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
