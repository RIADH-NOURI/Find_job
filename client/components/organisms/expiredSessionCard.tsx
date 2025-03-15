import { Clock } from 'lucide-react';
import React from 'react';

type ExpiredSessionCardProps = {
  logout: () => void,
}

const ExpiredSessionCard = ({ logout }: ExpiredSessionCardProps) => {
  return (
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-sm w-full text-center border border-gray-200">
        {/* Icon */}
        <div className="flex justify-center mb-6">
        <Clock size={48} color='#1D4ED8' />

        </div>

        {/* Header */}
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Your Session Has Expired
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 mb-6">
          But don't worry, a fresh start is just a click away.
        </p>

        {/* Button */}
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" onClick={logout}>
          Log In Again
        </button>
      </div>
  );
};

export default ExpiredSessionCard;