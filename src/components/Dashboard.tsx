import React from 'react';
import { Review, ReviewStats } from '../types/review';
import { StarRating } from './StarRating';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface DashboardProps {
  reviews: Review[];
  stats: ReviewStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ reviews, stats }) => {
  const chartData = Object.entries(stats.ratingDistribution).map(([rating, count]) => ({
    rating: Number(rating),
    count,
  }));

  return (
    <div className="space-y-8 p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Average Rating</h3>
          <div className="mt-2 flex items-center gap-2">
            <StarRating rating={Math.round(stats.averageRating)} readonly size={20} onRatingChange={() => {}} />
            <span className="text-2xl font-bold text-gray-900">
              {stats.averageRating.toFixed(1)}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Total Reviews</h3>
          <p className="text-3xl font-bold text-gray-900 mt-2">{stats.totalReviews}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800">Rating Distribution</h3>
          <div className="h-40 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="rating" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <h3 className="text-lg font-semibold p-6 border-b">Recent Reviews</h3>
        <div className="divide-y">
          {reviews.map((review) => (
            <div key={review.id} className="p-6">
              <div className="flex items-center gap-2 mb-2">
                <StarRating rating={review.rating} readonly size={16} onRatingChange={() => {}} />
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-gray-700">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};