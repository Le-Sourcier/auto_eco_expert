import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft, FileText, CheckCircle, AlertCircle, Copyright, RefreshCw } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('terms.meta.title')} - Auto Éco Expert</title>
        <meta name="description" content={t('terms.meta.description')} />
      </Helmet>

      <Header />
      
      <main className="pt-24 pb-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <Link 
            to="/" 
            className="inline-flex items-center text-[var(--primary-600)] hover:text-[var(--primary-800)] mb-8 group transition-colors"
          >
            <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
            {t('common.backToHome')}
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-50)] rounded-full -translate-y-1/2 translate-x-1/2 opacity-50" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--secondary-50)] rounded-full translate-y-1/2 -translate-x-1/2 opacity-30" />

            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-[var(--primary-50)] p-3 rounded-full">
                  <FileText className="w-8 h-8 text-[var(--primary-600)]" />
                </div>
                <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-800)]">
                  {t('terms.title')}
                </h1>
              </div>

              <div className="flex items-center text-[var(--primary-600)] mb-12 border-b border-gray-100 pb-6">
                <time className="flex items-center">
                  <RefreshCw size={16} className="mr-2" />
                  {t('terms.lastUpdated')}
                </time>
              </div>

              <div className="prose max-w-none">
                {t('terms.sections', { returnObjects: true }).map((section: any, index: number) => (
                  <div key={index} className="mb-12 last:mb-0">
                    <div className="flex items-center gap-3 mb-4">
                      {index === 0 && <CheckCircle className="w-6 h-6 text-[var(--primary-600)]" />}
                      {index === 1 && <FileText className="w-6 h-6 text-[var(--primary-600)]" />}
                      {index === 2 && <AlertCircle className="w-6 h-6 text-[var(--primary-600)]" />}
                      {index === 3 && <Copyright className="w-6 h-6 text-[var(--primary-600)]" />}
                      <h2 className="text-2xl font-bold text-[var(--primary-800)] !mt-0">
                        {section.title}
                      </h2>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-6 text-[var(--primary-600)] leading-relaxed">
                      <div className="whitespace-pre-line">
                        {section.content}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex items-start gap-4 bg-[var(--primary-50)] rounded-xl p-6">
                  <div className="bg-white p-3 rounded-full shrink-0">
                    <AlertCircle className="w-6 h-6 text-[var(--primary-600)]" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-[var(--primary-800)] mb-2">
                      Questions ou préoccupations ?
                    </h3>
                    <p className="text-[var(--primary-600)]">
                      Si vous avez des questions concernant nos conditions d'utilisation, 
                      n'hésitez pas à nous contacter à legal@auto-eco-expert.fr
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default TermsOfService;