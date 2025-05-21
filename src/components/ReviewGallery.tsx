import { useState } from "react";
import { Star, ThumbsUp, ChevronLeft, ChevronRight } from "lucide-react";
import { t } from "i18next";

interface Review {
  id: string;
  rating: number;
  comment: string;
  name: string;
  date: string;
  photo?: string;
  likes: number;
  adminResponse?: string;
  isLiked?: boolean;
}

interface ReviewGalleryProps {
  reviews: Review[];
  onLike: (reviewId: string) => void;
}

const ReviewGallery = ({ reviews, onLike }: ReviewGalleryProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState<number | null>(null);
  const reviewsPerPage = 10;

  const filteredReviews = reviews.filter(
    (review) => filter === null || review.rating === filter
  );

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const currentReviews = filteredReviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-[var(--primary-800)]">
          Avis vérifiés
        </h3>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter(null)}
            className={`px-4 py-2 rounded-full ${
              filter === null
                ? "bg-[var(--primary-600)] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            } transition-colors`}
          >
            Tous
          </button>
          {[5, 4, 3, 2, 1].map((rating) => (
            <button
              key={rating}
              onClick={() => setFilter(rating)}
              className={`px-4 py-2 rounded-full ${
                filter === rating
                  ? "bg-[var(--primary-600)] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              } transition-colors`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        {currentReviews.map((review) => (
          <div
            key={review.id}
            className="border-b border-gray-200 pb-6 last:border-0"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < review.rating
                          ? "text-[var(--secondary-500)] fill-[var(--secondary-500)]"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="font-medium text-[var(--primary-800)]">
                  {review.name}
                </p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>

              <button
                onClick={() => onLike(review.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded-full ${
                  review.isLiked
                    ? "bg-[var(--primary-100)] text-[var(--primary-600)]"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                } transition-colors`}
              >
                <ThumbsUp size={16} />
                <span>{review.likes}</span>
              </button>
            </div>

            <p className="mt-4 text-[var(--primary-600)]">{review.comment}</p>

            {review.photo && (
              <img
                src={review.photo}
                alt="Review"
                className="mt-4 rounded-lg max-h-48 object-cover"
              />
            )}

            {review.adminResponse && (
              <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                <p className="font-medium text-[var(--primary-700)] mb-2">
                  {t("ClientReview.TEAM_RESPONSE")}
                </p>
                <p className="text-[var(--primary-600)]">
                  {review.adminResponse}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
            {t("ClientReview.PREVIOUS")}
          </button>

          <span className="text-[var(--primary-600)]">
            {/* Page {currentPage} sur {totalPages} */}
            {t("ClientReview.PAGE_INFO", { currentPage, totalPages })}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {t("ClientReview.NEXT")}

            <ChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewGallery;
