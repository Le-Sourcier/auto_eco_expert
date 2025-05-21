import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

interface HeroProps {
  onStartChat: () => void;
}

const Hero = ({ onStartChat }: HeroProps) => {
  const { t } = useTranslation();
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 0,
    seconds: 0,
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const carImages = [
    "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
    "https://images.pexels.com/photos/3752169/pexels-photo-3752169.jpeg",
    "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg",
    "https://images.pexels.com/photos/3786093/pexels-photo-3786093.jpeg",
  ];

  useEffect(() => {
    const randomHours = Math.floor(Math.random() * 3);
    const randomMinutes = Math.floor(Math.random() * 60);
    const totalSeconds = randomHours * 3600 + randomMinutes * 60;

    let timeLeft = totalSeconds;

    const updateCountdown = () => {
      const hours = Math.floor(timeLeft / 3600);
      const minutes = Math.floor((timeLeft % 3600) / 60);
      const seconds = timeLeft % 60;

      setCountdown({ hours, minutes, seconds });

      if (timeLeft > 0) {
        timeLeft--;
      } else {
        timeLeft = 7200; // Reset to 2 hours
      }
    };

    updateCountdown();
    timerRef.current = setInterval(updateCountdown, 1000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const formatTime = (value: number): string => {
    return value.toString().padStart(2, "0");
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[var(--primary-700)] to-[var(--primary-900)] text-white pt-24 pb-16 px-4 flex items-center overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          className="absolute inset-0 w-full h-full"
        >
          {carImages.map((image, index) => (
            <SwiperSlide key={index}>
              <div
                className="w-full h-full bg-cover bg-center "
                style={{
                  backgroundImage: `url(${image})`,
                  opacity: 0.15,
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="absolute inset-0 bg-gradient-to-r from-[var(--primary-900)] via-transparent to-transparent opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[var(--primary-900)] opacity-90" />
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.div
            className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[var(--secondary-500)] font-semibold mr-2">
              {t("hero.newBadge")}
            </span>
            <span className="text-white/80">{t("hero.aiLabel")}</span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t("hero.mainTitle")}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            {t("hero.description")}
          </motion.p>

          <motion.div
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 inline-block border border-white/20"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <p className="text-lg md:text-xl font-medium flex items-center">
              <span className="animate-pulse text-[var(--secondary-400)] mr-3">
                ⚠️
              </span>
              <span className="text-white/90">{t("hero.urgency")}</span>
            </p>
            <div className="mt-4 font-mono font-bold text-2xl flex items-center gap-2">
              <span className="text-gray-300">
                {t("hero.countdownPrefix")}:
              </span>
              <div className="flex gap-2">
                <span className="bg-[var(--secondary-500)] text-[var(--primary-800)] px-3 py-1 rounded">
                  {formatTime(countdown.hours)}
                </span>
                <span className="text-[var(--secondary-400)]">:</span>
                <span className="bg-[var(--secondary-500)] text-[var(--primary-800)] px-3 py-1 rounded">
                  {formatTime(countdown.minutes)}
                </span>
                <span className="text-[var(--secondary-400)]">:</span>
                <span className="bg-[var(--secondary-500)] text-[var(--primary-800)] px-3 py-1 rounded">
                  {formatTime(countdown.seconds)}
                </span>
              </div>
            </div>
          </motion.div>

          <motion.button
            onClick={onStartChat}
            className="btn btn-primary text-lg md:text-xl px-8 py-4 group"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {t("hero.cta")}
            <span className="inline-block transition-transform group-hover:translate-x-1 ml-2">
              →
            </span>
          </motion.button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
