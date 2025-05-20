import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Hero from '../components/Hero';
import VideoIntro from '../components/VideoIntro';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import ReviewForm from '../components/ReviewForm';
import ReviewGallery from '../components/ReviewGallery';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import Chatbot from '../components/Chatbot/Chatbot';

const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: "Service exceptionnel ! J'ai économisé plus de 4000€ sur ma nouvelle voiture grâce à leurs conseils avisés.",
    name: 'Thomas D.',
    date: '15 février 2024',
    likes: 12,
    adminResponse: "Merci Thomas pour votre confiance ! Nous sommes ravis d'avoir pu vous aider à réaliser ces économies substantielles."
  },
  {
    id: '2',
    rating: 5,
    comment: "L'IA a vraiment fait la différence dans ma recherche. Les recommandations étaient parfaitement adaptées à mes besoins.",
    name: 'Sophie M.',
    date: '12 février 2024',
    photo: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg',
    likes: 8
  },
  // Add more mock reviews as needed
];

const LandingPage = () => {
  const { t } = useTranslation();
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [reviews, setReviews] = useState(mockReviews);
  
  const handleStartChat = () => {
    setIsChatbotOpen(true);
  };

  const handleReviewSubmit = (review: {
    rating: number;
    comment: string;
    name: string;
    isAnonymous: boolean;
    photo?: File;
  }) => {
    const newReview = {
      id: Date.now().toString(),
      ...review,
      name: review.isAnonymous ? 'Anonyme' : review.name,
      date: new Date().toLocaleDateString('fr-FR'),
      likes: 0,
      photo: review.photo ? URL.createObjectURL(review.photo) : undefined
    };

    setReviews([newReview, ...reviews]);
  };

  const handleLike = (reviewId: string) => {
    setReviews(reviews.map(review => 
      review.id === reviewId
        ? { ...review, likes: review.likes + 1, isLiked: true }
        : review
    ));
  };
  
  return (
    <>
      <Helmet>
        <title>{t('meta.title')}</title>
        <meta name="description" content={t('meta.description')} />
      </Helmet>
      
      <Header />
      <Hero onStartChat={handleStartChat} />
      
      <section className="py-24 px-4 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-800)] text-center mb-12">
            Découvrez comment nous pouvons vous aider
          </h2>
          <VideoIntro />
        </div>
      </section>
      
      <HowItWorks />
      <Testimonials />
      
      <section id="avis" className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--primary-800)] text-center mb-12">
            Avis de nos clients
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <ReviewForm onSubmit={handleReviewSubmit} />
            <ReviewGallery reviews={reviews} onLike={handleLike} />
          </div>
        </div>
      </section>
      
      <FAQ />
      <Footer />
      
      <Chatbot />
    </>
  );
};

export default LandingPage;