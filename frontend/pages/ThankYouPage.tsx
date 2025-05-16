import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Footer from '../components/Footer';

const ThankYouPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-16 px-4">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="inline-flex justify-center items-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle size={48} className="text-green-600" />
            </div>
            
            <h1 className="text-3xl font-bold text-[var(--primary-800)] mb-4">
              Merci pour votre demande !
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              Notre équipe d'experts analyse déjà les meilleures offres pour vous. Vous recevrez votre étude personnalisée par email dans les prochaines 24 heures.
            </p>
            
            <div className="bg-[var(--primary-50)] border border-[var(--primary-200)] rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-[var(--primary-700)] mb-4">
                En attendant, voici votre guide bonus
              </h2>
              
              <p className="text-gray-600 mb-4">
                Nous vous avons envoyé par email notre guide exclusif :
              </p>
              
              <div className="font-medium text-lg text-[var(--primary-800)]">
                "10 astuces pour négocier comme un pro en concession"
              </div>
            </div>
            
            <Link to="/" className="inline-flex items-center text-[var(--primary-600)] hover:text-[var(--primary-800)] transition-colors">
              <ArrowLeft size={16} className="mr-2" />
              Retourner à l'accueil
            </Link>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ThankYouPage;