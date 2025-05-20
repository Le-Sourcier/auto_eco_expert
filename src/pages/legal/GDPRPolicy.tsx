import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

const GDPRPolicy = () => {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('gdpr.meta.title')} - Auto Éco Expert</title>
        <meta name="description" content={t('gdpr.meta.description')} />
      </Helmet>

      <Header />
      
      <main className="pt-24 pb-16 bg-gray-50">
        <div className="container-custom">
          <Link to="/" className="inline-flex items-center text-[var(--primary-600)] hover:text-[var(--primary-800)] mb-8">
            <ArrowLeft size={20} className="mr-2" />
            {t('common.backToHome')}
          </Link>

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-[var(--primary-800)] mb-4">
              {t('gdpr.title')}
            </h1>

            <p className="text-[var(--primary-600)] mb-8">
              {t('gdpr.lastUpdated')}
            </p>

            <div className="prose max-w-none">
              {t('gdpr.sections', { returnObjects: true }).map((section: any, index: number) => (
                <div key={index} className="mb-8">
                  <h2 className="text-2xl font-bold text-[var(--primary-800)] mb-4">
                    {section.title}
                  </h2>
                  <div className="text-[var(--primary-600)] whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
};

export default GDPRPolicy;