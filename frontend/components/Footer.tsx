import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Car, Shield, Mail, Phone, Facebook, Instagram, Twitter } from 'lucide-react';
import { useScrollTo } from '../hooks/useScrollTo';

const Footer = () => {
  const { t } = useTranslation();
  const scrollTo = useScrollTo();
  const location = useLocation();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    scrollTo(id, {
      timeout: location.pathname !== '/' ? 300 : 100 // Longer timeout if navigating from another page
    });
  };

  const navItems = [
    { label: t('footer.howItWorks'), id: 'comment-ca-marche' },
    { label: t('footer.testimonials'), id: 'temoignages' },
    { label: t('footer.faq'), id: 'faq' }
  ];

  return (
    <footer className="bg-[var(--primary-900)] text-white" role="contentinfo">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car size={24} className="text-[var(--secondary-500)]" />
              <h3 className="text-xl font-bold">Auto Éco Expert</h3>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--primary-800)] hover:bg-[var(--primary-700)] p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)]"
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--primary-800)] hover:bg-[var(--primary-700)] p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)]"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[var(--primary-800)] hover:bg-[var(--primary-700)] p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)]"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.quickLinks')}</h4>
            <ul className="space-y-2" role="menu">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => handleNavClick(e, item.id)}
                    className="text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 inline-block"
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.legal')}</h4>
            <ul className="space-y-2" role="menu">
              <li>
                <Link 
                  to="/privacy"
                  className="text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 inline-block"
                  role="menuitem"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms"
                  className="text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 inline-block"
                  role="menuitem"
                >
                  {t('footer.terms')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/cookies"
                  className="text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 inline-block"
                  role="menuitem"
                >
                  {t('footer.cookies')}
                </Link>
              </li>
              <li>
                <Link 
                  to="/gdpr"
                  className="text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1 inline-block"
                  role="menuitem"
                >
                  {t('footer.gdpr')}
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('footer.contact')}</h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="mailto:contact@auto-eco-expert.fr"
                  className="flex items-center gap-2 text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1"
                >
                  <Mail size={18} className="text-[var(--secondary-500)]" />
                  <span>contact@auto-eco-expert.fr</span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+33123456789"
                  className="flex items-center gap-2 text-gray-400 hover:text-[var(--secondary-500)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--secondary-500)] rounded-md px-2 py-1"
                >
                  <Phone size={18} className="text-[var(--secondary-500)]" />
                  <span>01 23 45 67 89</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-400 px-2 py-1">
                <Shield size={18} className="text-[var(--secondary-500)]" />
                <span>{t('footer.dataProtection')}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>{t('footer.copyright', { year: new Date().getFullYear() })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;