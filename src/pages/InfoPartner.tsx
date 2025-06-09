import { t } from "i18next";
import BG_IMAGE from "../assets/info.jpeg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Helmet } from "react-helmet-async";

const data = [
  //   {
  //     company: "Je Choisi Ma Voiture",
  //     link: "https://jechoisimavoiture.fr/privacy",
  //   },
  {
    company: "Volvo Ex30 Jechoisimavoiture",
    link: "https://volvo-ex30.jechoisimavoiture.fr",
  },
  {
    company: "Pass Renovation",
    link: "https://passrenovation.fr/privacy",
  },
  {
    company: "IZI By EDF Pass Renovation ",
    link: "https://izi-by-edf.passrenovation.fr/privacy",
  },
  {
    company: "Eco Renov Habitat",
    link: "https://ecorenov-habitat.fr/politique-confidentialite",
  },
  {
    company: "Eco Subvention",
    link: "https://ecosubvention.com/privacy",
  },
  {
    company: "Ma Lettre Immo",
    link: "https://malettreimmo.fr/confidentialite",
  },
];

export default function InfoPartner() {
  return (
    <div>
      <Helmet>
        <title>{t("infoPartner.meta.title")} - Auto Éco Expert</title>
        <meta name="description" content={t("infoPartner.meta.description")} />
      </Helmet>
      <Header
      // className={` fixed top-0 z-50 w-full transition-all duration-300 backdrop-blur-sm
      //         ${
      //           isScrolled
      //             ? "bg-white/90 shadow-sm py-2"
      //             : "bg-transparent py-4"
      //         }`}
      />
      <_ />
      <Footer />
    </div>
  );
}

function _() {
  const columns = [
    { label: t("infoPartner.labels.company"), accessor: "company" },
    { label: t("infoPartner.labels.privacy_policy"), accessor: "link" },
  ];
  return (
    <div className="">
      <div className="">
        {/* HERO */}
        <div className="relative h-[80vh] -z-10 overflow-hidden">
          <img
            src={BG_IMAGE}
            alt="Info"
            className="object-cover w-full h-full"
          />
          <div className=" absolute inset-0 bg-black/80" />
        </div>

        {/* BLOC AVANT-PLAN */}
        <div className="-translate-y-[20%] inset-x-0 top-[40vh] flex justify-center px-4">
          <div className="max-w-5xl w-full bg-white/90 p-10 rounded-t-3xl shadow-2xl backdrop-blur-md">
            {/* TITRE + INTRO */}
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center">
              {t("infoPartner.hero.title")}
            </h1>
            <p className="mt-4 text-center text-gray-700">
              {t("infoPartner.hero.intro")}
            </p>

            {/* CONTENU */}
            <div className="mt-4 text-gray-700">
              <p>{t("infoPartner.main_text.mission")}</p>
              <p className="mt-4 text-gray-700">
                {t("infoPartner.main_text.data_usage_warning")}
              </p>
              <p className="mt-4 text-center text-red-500">
                {t("infoPartner.main_text.responsibility_warning")}
              </p>
              <p className="mt-4 text-gray-700">
                {t("infoPartner.main_text.legal_notice")}
              </p>
            </div>

            {/* SECTION RESPONSABLES */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <p className="text-xl md:text-2xl font-bold text-gray-900 text-center">
                {t("infoPartner.controller_section.title")}
              </p>
              <p className="mt-4 text-gray-700">
                {t("infoPartner.controller_section.description")}
              </p>

              {/* TABLE DES PARTENAIRES */}
              <Table columns={columns} data={data} />

              {/* CONTACT */}
              <p className="mt-4 text-gray-700 font-medium">
                {t("infoPartner.contact", {
                  email: "",
                })}
                <a
                  href="mailto:dpo@jechoisimavoiture.fr"
                  className="hover:underline"
                >
                  dpo@jechoisimavoiture.fr
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export type TableColumn = {
  label: string;
  accessor: string;
};

export type TableRow = {
  [key: string]: string;
};

interface Props {
  columns: TableColumn[];
  data: TableRow[];
}
function Table({ columns, data }: Props) {
  return (
    <div className="mt-6 overflow-x-auto w-full rounded-2xl">
      <table className="min-w-full bg-white border border-gray-300 text-sm text-left text-gray-800">
        <thead className="bg-gray-100 text-gray-900 font-semibold">
          <tr>
            {columns.map((col) => (
              <th key={col.accessor} className="px-4 py-3 border-b">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="hover:bg-gray-50">
              {columns.map((col) => {
                const cell = row[col.accessor];
                const isLink = cell?.startsWith("http");
                return (
                  <td key={col.accessor} className="px-4 py-2 border-b">
                    {isLink ? (
                      <a
                        href={cell}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        {cell.length > 60 ? cell.slice(0, 60) + "..." : cell}
                      </a>
                    ) : (
                      cell
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
