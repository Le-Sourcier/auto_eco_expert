import { useState } from "react";
import { Star, Upload } from "lucide-react";
import { t } from "i18next";

interface ReviewFormProps {
  onSubmit: (review: {
    rating: number;
    comment: string;
    name: string;
    isAnonymous: boolean;
    photo?: File;
  }) => void;
}

const ReviewForm = ({ onSubmit }: ReviewFormProps) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [name, setName] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    onSubmit({
      rating,
      comment,
      name,
      isAnonymous,
      photo: photo || undefined,
    });

    // Reset form
    setRating(0);
    setComment("");
    setName("");
    setIsAnonymous(false);
    setPhoto(null);
    setPhotoPreview(null);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-2xl font-bold text-[var(--primary-800)] mb-6">
        {t("ClientReview.SUBTITLE")}
      </h3>

      <div className="mb-6">
        <label className="block text-[var(--primary-600)] mb-2">
          {t("ClientReview.RATING")}
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className="text-2xl focus:outline-none"
            >
              <Star
                size={32}
                className={`${
                  value <= rating
                    ? "text-[var(--secondary-500)] fill-[var(--secondary-500)]"
                    : "text-gray-300"
                } transition-colors`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[var(--primary-600)] mb-2">
          {t("ClientReview.COMMENT_LABEL")}
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          maxLength={500}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent"
          placeholder={t("ClientReview.DETAILS_PLACEHOLDER")}
        />
        <div className="text-sm text-gray-500 mt-1">
          {comment.length}/500 {t("ClientReview.CHARACTERS")}
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[var(--primary-600)] mb-2">
          {t("ClientReview.ADD_PHOTO")}
        </label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
            id="photo-upload"
          />
          <label
            htmlFor="photo-upload"
            className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[var(--primary-400)] transition-colors"
          >
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="h-full w-full object-cover rounded-lg"
              />
            ) : (
              <div className="text-center">
                <Upload className="mx-auto text-gray-400 mb-2" />
                <span className="text-gray-500">
                  {t("ClientReview.CLICK_TO_ADD_PHOTO")}
                </span>
              </div>
            )}
          </label>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-[var(--primary-600)] mb-2">
          {t("ClientReview.NAME_LABEL")}
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--primary-300)] focus:border-transparent"
          placeholder={t("ClientReview.NAME_LABEL")}
          disabled={isAnonymous}
        />
        <div className="mt-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded text-[var(--primary-600)]"
            />
            <span className="ml-2 text-gray-600">
              {t("ClientReview.ANONYMOUS")}
            </span>
          </label>
        </div>
      </div>

      <button
        type="submit"
        disabled={rating === 0}
        className="w-full bg-[var(--primary-600)] text-white py-3 rounded-lg font-medium hover:bg-[var(--primary-700)] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
      >
        {t("ClientReview.POST_REVIEW")}
      </button>
    </form>
  );
};

export default ReviewForm;
