import type { ReviewItem } from "@/lib/content";

function stars(rating: number): string {
  const filled = "★".repeat(Math.max(0, Math.min(5, rating)));
  const empty = "☆".repeat(Math.max(0, 5 - rating));
  return `${filled}${empty}`;
}

export default function ReviewCards({ reviews }: { reviews: ReviewItem[] }) {
  if (!reviews.length) return null;

  return (
    <div className="review-grid">
      {reviews.map((review, index) => (
        <article className="review-card" key={`${review.name}-${index}`}>
          <div className="review-stars" aria-label={review.ratingLabel}>
            {stars(review.rating)}{" "}
            <span className="secondary">{review.ratingLabel.replace(/^★+\s*/, "")}</span>
          </div>
          <blockquote className="review-quote">{review.quote}</blockquote>
          <p className="review-meta">
            — {review.name}
            {review.city ? `, ${review.city}` : ""}
          </p>
        </article>
      ))}
    </div>
  );
}
