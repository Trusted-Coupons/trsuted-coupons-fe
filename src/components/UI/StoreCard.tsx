'use client'
import { useState } from 'react';

interface StoreCardProps {
  logoUrl: string;
  storeName: string;
  description: string;
  countryCodes: string[];
  storeId: number;
}

const StoreCard: React.FC<StoreCardProps> = ({ logoUrl, storeName, description, countryCodes, storeId }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionLimit = 250;

  const toggleReadMore = () => setIsExpanded(!isExpanded);
  const countryRoutes: { [key: string]: string } = {
    AU: '/en-AU/stores/',
    CA: '/en-CA/stores/',
    GB: '/en-GB/stores/',
    IN: '/en-IN/stores/',
    PH: '/en-PH/stores/',
    US: '/en-US/stores/',
    CZ: '/cs-CZ/stores/',
    DE: '/de-DE/stores/',
    SK: '/sk-SK/stores/',
    AT: '/de-AT/stores/',
    CH: '/de-CH/stores/', // defaulting to German
    GR: '/el-GR/stores/',
    NL: '/nl-NL/stores/',
    PL: '/pl-PL/stores/',
    FR: '/fr-FR/stores/',
    IE: '/en-IE/stores/',
    KR: '/ko-KR/stores/',
    UA: '/uk-UA/stores/',
    BE: '/nl-BE/stores/', // defaulting to Dutch
    AE: '/ar-AE/stores/',
    AL: '/sq-AL/stores/',
    AR: '/es-AR/stores/',
    BR: '/pt-BR/stores/',
    CN: '/zh-CN/stores/',
    BG: '/bg-BG/stores/',
    HR: '/hr-HR/stores/',
    HU: '/hu-HU/stores/',
    ID: '/id-ID/stores/',
    IL: '/he-IL/stores/',
    IT: '/it-IT/stores/',
    JP: '/ja-JP/stores/',
    LT: '/lt-LT/stores/',
    LV: '/lv-LV/stores/',
    MY: '/ms-MY/stores/',
    NG: '/en-NG/stores/',
    NO: '/no-NO/stores/',
    NZ: '/en-NZ/stores/',
    PK: '/en-PK/stores/',
    PT: '/pt-PT/stores/',
    RO: '/ro-RO/stores/',
    RS: '/sr-RS/stores/',
    RU: '/ru-RU/stores/',
    SA: '/ar-SA/stores/',
    SE: '/sv-SE/stores/',
    SG: '/en-SG/stores/',
    SI: '/sl-SI/stores/',
    TH: '/th-TH/stores/',
    TR: '/tr-TR/stores/',
    TW: '/zh-TW/stores/',
    UY: '/es-UY/stores/',
    VN: '/vi-VN/stores/',
    ZA: '/en-ZA/stores/',
  }
  const handleFlagClick = (code: string) => {
    const link = `${countryRoutes[code]}${storeId}`; 
    if (link) {
      window.open(link, '_blank'); // Open link in new tab
    } else {
      alert(`No link available for ${code}`);
    }
  };

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
            className="h-6 w-8 cursor-pointer"
            onClick={() => handleFlagClick(code)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreCard;

