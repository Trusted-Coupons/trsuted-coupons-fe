'use client'
import { useState } from 'react';

interface StoreCardProps {
  logoUrl: string;
  storeName: string;
  description: string;
  countryCodes: string[];
}

const StoreCard: React.FC<StoreCardProps> = ({ logoUrl, storeName, description, countryCodes }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionLimit = 250;

  const toggleReadMore = () => setIsExpanded(!isExpanded);

  return (
    <div className="border rounded-lg p-6 shadow-md bg-white">
      <img src={logoUrl} alt={`${storeName} logo`} className="h-24 w-24 mb-4 mx-auto" />
      <h2 className="text-xl font-semibold mb-2 text-center">{storeName}</h2>
      <p className="text-gray-600 text-sm">
        {/* Display limited description or full based on isExpanded */}
        {isExpanded ? description : description.slice(0, descriptionLimit) + (description.length > descriptionLimit ? '...' : '')}
      </p>

      {/* "Read More" button */}
      {description.length > descriptionLimit && (
        <button
          onClick={toggleReadMore}
          className="text-primary font-semibold text-sm mt-2 hover:underline"
        >
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      <div className="flex justify-center mt-4 space-x-2">
        {countryCodes.map((code) => (
          <img
            key={code}
            src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
            alt={code}
            className="h-6 w-8"
          />
        ))}
      </div>
    </div>
  );
};

export default StoreCard;

