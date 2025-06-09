import { t } from "i18next";
import { Helmet } from "react-helmet-async";

const NotFoundPage = () => {
  return (
    <>
      <Helmet>
        <title>{t("notfound.meta.title")} - Auto Éco Expert</title>
        <meta name="description" content={t("notfound.meta.description")} />
      </Helmet>
      <main className="min-h-screen flex items-center justify-center bg-[var(--primary-900)] text-white p-6">
        <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-lg shadow-lg p-10 text-center">
          <h1 className="text-[8rem] font-extrabold select-none tracking-widest">
            404
          </h1>
          <h2 className="text-3xl font-semibold text-[var(--secondary-500)] mt-4">
            {t("notfound.title")}
          </h2>
          <p className="mt-2 mb-8 text-gray-300">{t("notfound.message")}</p>
          <a
            href="/"
            className="inline-block px-8 py-3 bg-[var(--secondary-500)] text-white font-semibold rounded-md shadow-md hover:bg-secondary-600 transition-colors focus:outline-none focus:ring-4 focus:ring-secondary-400"
            aria-label="Retour à l'accueil"
          >
            {t("notfound.back_home")}
          </a>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
