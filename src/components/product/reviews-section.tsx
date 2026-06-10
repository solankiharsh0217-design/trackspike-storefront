'use client';

import { useState, useEffect } from 'react';
import { Star, ThumbsUp, MessageSquare } from 'lucide-react';
import { useAuthStore } from '@/store/auth-store';
import type { Review } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8787';

interface ReviewsSectionProps {
  productSlug: string;
}

export function ReviewsSection({ productSlug }: ReviewsSectionProps) {
  const { user, token } = useAuthStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReviews();
  }, [productSlug]);

  async function fetchReviews() {
    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productSlug}/reviews`);
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitReview(e: React.FormEvent) {
    e.preventDefault();
    if (!user || !token) return;

    setError('');
    setSubmitting(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/products/${productSlug}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ rating, title, content: content || undefined }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit review');
      }

      setReviews([data, ...reviews]);
      setShowForm(false);
      setRating(5);
      setTitle('');
      setContent('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  return (
    <div className="border-t border-white/[0.04] pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h3 className="font-heading text-xl font-bold uppercase tracking-[-0.02em]">
            Reviews
          </h3>
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-white/40">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`h-3.5 w-3.5 ${
                      s <= Math.round(averageRating)
                        ? 'fill-accent text-accent'
                        : 'text-white/15'
                    }`}
                  />
                ))}
              </div>
              <span>({reviews.length})</span>
            </div>
          )}
        </div>

        {user && !showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-accent hover:text-accent/80 transition-colors"
          >
            <MessageSquare className="h-3.5 w-3.5" />
            Write Review
          </button>
        )}
      </div>

      {/* Write Review Form */}
      {showForm && (
        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.02] p-6">
          <h4 className="text-sm font-bold uppercase tracking-wider text-white/60 mb-4">
            Your Review
          </h4>

          {error && (
            <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/5 p-3 text-xs text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmitReview} className="space-y-4">
            {/* Rating */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Rating
              </label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setRating(s)}
                    className="p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      className={`h-6 w-6 ${
                        s <= rating
                          ? 'fill-accent text-accent'
                          : 'text-white/15 hover:text-white/30'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Summarize your experience"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none"
              />
            </div>

            {/* Content */}
            <div>
              <label className="mb-2 block text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
                Review (optional)
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tell others about your experience..."
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-accent focus:outline-none resize-none"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="rounded-xl bg-accent px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black transition-all hover:shadow-[0_8px_20px_-5px_rgba(212,165,32,0.4)] disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Reviews List */}
      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-2xl bg-white/[0.03]" />
          ))}
        </div>
      ) : reviews.length === 0 ? (
        <div className="py-12 text-center">
          <MessageSquare className="mx-auto mb-4 h-8 w-8 text-white/10" />
          <p className="text-sm text-white/30">
            No reviews yet. Be the first to share your experience!
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="rounded-2xl border border-white/[0.04] bg-white/[0.02] p-5"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex items-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`h-3 w-3 ${
                            s <= review.rating
                              ? 'fill-accent text-accent'
                              : 'text-white/15'
                          }`}
                        />
                      ))}
                    </div>
                    {review.isVerified && (
                      <span className="text-[9px] font-bold uppercase tracking-wider text-green-400/80 bg-green-400/10 px-2 py-0.5 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-white/80">
                    {review.title}
                  </h4>
                </div>
                <span className="text-[10px] text-white/20">
                  {new Date(review.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              {review.content && (
                <p className="text-sm leading-relaxed text-white/40">
                  {review.content}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
