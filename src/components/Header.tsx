import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Car, Menu, X } from "lucide-react";
import { useScrollTo } from "../hooks/useScrollTo";
import LanguageSelector from "./LanguageSelector";

const Header = () => {
  const { t } = useTranslation();
  const scrollTo = useScrollTo();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY === 0);
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    scrollTo(id);
    setIsMobileMenuOpen(false);
  };

  const navItems = [
    { label: t("howItWorks.title"), id: "comment-ca-marche" },
    { label: t("footer.testimonials"), id: "temoignages" },
    { label: "FAQ", id: "faq" },
  ];

  const headerClasses = `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
    isScrolled ? "bg-white/90 backdrop-blur-md shadow-lg" : "bg-transparent"
  }`;

  const textColorClass = isAtTop ? "text-white" : "text-[var(--primary-700)]";
  const logoColorClass = isAtTop
    ? "text-[var(--secondary-500)]"
    : "text-[var(--primary-700)]";

  return (
    <header className={headerClasses} role="banner">
      <div className="container-custom">
        <nav
          className="flex items-center justify-between py-4"
          role="navigation"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Car
              size={32}
              className={`transition-colors duration-300 ${logoColorClass}`}
            />
            <span
              className={`text-xl font-bold transition-colors duration-300 ${textColorClass}`}
            >
              Auto Éco Expert
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-6">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`transition-colors duration-300 hover:text-[var(--secondary-500)] focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 ${textColorClass}`}
                  role="menuitem"
                >
                  {item.label}
                </a>
              ))}
            </div>
            <LanguageSelector />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-full transition-colors duration-300 ${textColorClass}`}
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-200"
            role="menu"
          >
            <div className="container-custom py-4">
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-[var(--primary-700)] hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="pt-4 border-t border-gray-200">
                  <LanguageSelector />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
