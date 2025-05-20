import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const Testimonials = () => {
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);
  
  const testimonials = [
    {
      text: t('testimonials.testimonial1.text'),
      author: t('testimonials.testimonial1.author'),
      rating: 5,
      car: 'BMW Serie 1',
      image: 'https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg'
    },
    {
      text: t('testimonials.testimonial2.text'),
      author: t('testimonials.testimonial2.author'),
      rating: 5,
      car: 'Peugeot 3008',
      image: 'https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg'
    },
    {
      text: "J'ai économisé 4 200€ sur ma Renault Clio neuve grâce à l'analyse détaillée des offres!",
      author: "Thomas, Paris",
      rating: 5,
      car: 'Renault Clio',
      image: 'https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg'
    }
  ];

  return (
    <section id="temoignages" className="py-24 px-4 bg-gradient-to-br from-[var(--accent-600)] to-[var(--accent-800)] text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3" />
      </div>

      <div className="container-custom relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            {t('testimonials.title')}
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-8" />
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Découvrez les retours d'expérience de nos clients satisfaits
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="testimonials-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="relative">
                    <div className="absolute -top-6 -left-6 text-white/20">
                      <Quote size={64} />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 relative">
                      <div className="flex gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} size={20} fill="#FFAC00" color="#FFAC00" />
                        ))}
                      </div>
                      
                      <p className="text-xl italic mb-6">"{testimonial.text}"</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold">{testimonial.author}</p>
                          <p className="text-white/80">{testimonial.car}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.car}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <div className="flex justify-center items-center gap-4 mt-8">
            <button 
              className="swiper-button-prev w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex ? 'bg-white scale-125' : 'bg-white/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            
            <button 
              className="swiper-button-next w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-colors flex items-center justify-center"
              aria-label="Next testimonial"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;