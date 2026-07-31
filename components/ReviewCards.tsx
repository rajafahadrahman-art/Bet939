import type { ReviewItem } from "@/lib/content";
import { cleanDisplayText } from "@/lib/display-text";

function stars(rating: number): string {
  const filled = "★".repeat(Math.max(0, Math.min(5, rating)));
  const empty = "☆".repeat(Math.max(0, 5 - rating));
  return `${filled}${empty}`;
}

export default function ReviewCards({ reviews }: { reviews: ReviewItem[] }) {
  if (!reviews.length) return null;

  return (
    <div className="review-grid">
      {reviews.map((review, index) => {
        const quote = cleanDisplayText(review.quote).replace(/^["“]|["”]$/g, "");
        const name = cleanDisplayText(review.name);
        const city = cleanDisplayText(review.city);
        const ratingLabel = cleanDisplayText(review.ratingLabel);
        return (
          <article className="review-card" key={`${name}-${index}`}>
            <div className="review-stars" aria-label={ratingLabel}>
              {stars(review.rating)}
            </div>
            <blockquote className="review-quote">“{quote}”</blockquote>
            <p className="review-meta">
              — {name}
              {city ? `, ${city}` : ""}
            </p>
          </article>
        );
      })}
    </div>
  );
}
