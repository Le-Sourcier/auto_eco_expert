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
import "./i18n/i18n";
import "./index.css";
import { AuthProvider } from "./services/providers/authProvider";
import Cookies from "js-cookie";
import InfoPartner from "./pages/InfoPartner";
import NotFoundPage from "./pages/NotFound";

function App() {
  const { i18n } = useTranslation();
  useEffect(() => {
    const savedLang = Cookies.get("i18next") || localStorage.getItem("i18next");
    if (savedLang && i18n.language !== savedLang) {
      i18n.changeLanguage(savedLang);
    }
  }, [i18n]);

  return (
    <HelmetProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/partners-privacy" element={<InfoPartner />} />
            <Route path="/merci" element={<ThankYouPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/cookies" element={<CookiePolicy />} />
            <Route path="/gdpr" element={<GDPRPolicy />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
