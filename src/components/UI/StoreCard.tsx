'use client';
import { useState } from 'react';

interface StoreCardProps {
  logoUrl: string;
  storeName: string;
  description: string;
  countryCodes: string[];
  storeId: number;
}

const StoreCard: React.FC<StoreCardProps> = ({
  logoUrl,
  storeName,
  description,
  countryCodes,
  storeId
}) => {
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
    CH: '/de-CH/stores/',
    GR: '/el-GR/stores/',
    NL: '/nl-NL/stores/',
    PL: '/pl-PL/stores/',
    FR: '/fr-FR/stores/',
    IE: '/en-IE/stores/',
    KR: '/ko-KR/stores/',
    UA: '/uk-UA/stores/',
    BE: '/nl-BE/stores/',
    AE: '/ar-AE/stores/',
    AL: '/sq-AL/stores/',
    AM: '/hy-AM/stores/',
    AR: '/es-AR/stores/',
    AZ: '/az-AZ/stores/',
    BA: '/sr-BA/stores/',
    BD: '/bn-BD/stores/',
    BG: '/bg-BG/stores/',
    BH: '/ar-BH/stores/',
    BO: '/es-BO/stores/',
    BR: '/pt-BR/stores/',
    CL: '/es-CL/stores/',
    CN: '/zh-CN/stores/',
    CO: '/es-CO/stores/',
    CR: '/es-CR/stores/',
    CY: '/el-CY/stores/',
    DK: '/da-DK/stores/',
    DO: '/es-DO/stores/',
    EC: '/es-EC/stores/',
    EE: '/et-EE/stores/',
    EG: '/ar-EG/stores/',
    ES: '/es-ES/stores/',
    FI: '/fi-FI/stores/',
    GE: '/ka-GE/stores/',
    GT: '/es-GT/stores/', // not working
    HN: '/es-HN/stores/',
    HR: '/hr-HR/stores/',
    HU: '/hu-HU/stores/',
    ID: '/id-ID/stores/',
    IL: '/he-IL/stores/',
    IS: '/is-IS/stores/',
    IT: '/it-IT/stores/',
    JM: '/en-JM/stores/',
    JO: '/ar-JO/stores/',
    JP: '/ja-JP/stores/',
    KW: '/ar-KW/stores/',
    KZ: '/kk-KZ/stores/',
    LA: '/lo-LA/stores/',
    LB: '/ar-LB/stores/',
    LK: '/en-LK/stores/',
    LT: '/lt-LT/stores/',
    LU: '/fr-LU/stores/',
    LV: '/lv-LV/stores/',
    MA: '/ar-MA/stores/',
    MD: '/ro-MD/stores/',
    ME: '/sr-ME/stores/',
    MK: '/mk-MK/stores/',
    MT: '/en-MT/stores/',
    MX: '/es-MX/stores/',
    MY: '/ms-MY/stores/',
    NG: '/en-NG/stores/',
    NI: '/es-NI/stores/',
    NO: '/no-NO/stores/',
    NZ: '/en-NZ/stores/',
    OM: '/ar-OM/stores/',
    PA: '/es-PA/stores/',
    PE: '/es-PE/stores/',
    PK: '/en-PK/stores/',
    PT: '/pt-PT/stores/',
    PY: '/es-PY/stores/',
    QA: '/ar-QA/stores/',
    RO: '/ro-RO/stores/',
    RS: '/sr-RS/stores/',
    RU: '/ru-RU/stores/',
    SA: '/ar-SA/stores/',
    SE: '/sv-SE/stores/',
    SG: '/en-SG/stores/',
    SI: '/sl-SI/stores/',
    SV: '/es-SV/stores/',
    TH: '/th-TH/stores/',
    TR: '/tr-TR/stores/',
    TW: '/zh-TW/stores/',
    UY: '/es-UY/stores/',
    VN: '/vi-VN/stores/',
    ZA: '/en-ZA/stores/'
  };

  const handleFlagClick = (code: string) => {
    const link = `${countryRoutes[code]}${storeId}`;
    if (link) {
      window.open(link, '_blank'); // Open link in new tab
    } else {
      alert(`No link available for ${code}`);
    }
  };

  // Split flags into rows with a maximum of 8 flags per row
  const rows = [];
  for (let i = 0; i < countryCodes.length; i += 8) {
    rows.push(countryCodes.slice(i, i + 8));
  }

  return (
    <div className="border-1 border-gray rounded-3xl p-6 bg-white">
      {/* <img src={logoUrl} alt={`${storeName} logo`} className="h-24 w-24 mb-4 mx-auto" /> */}
      <h2 className="text-xl font-semibold mb-2 text-start">Store Description</h2>
      <p className="text-gray-600 text-sm">
        {/* Display limited description or full based on isExpanded */}
        {isExpanded
          ? description
          : description.slice(0, descriptionLimit) +
            (description.length > descriptionLimit ? '...' : '')}
      </p>

      {/* "Read More" button */}
      {description.length > descriptionLimit && (
        <button
          onClick={toggleReadMore}
          className="text-primary font-semibold text-sm mt-2 hover:underline">
          {isExpanded ? 'Read Less' : 'Read More'}
        </button>
      )}

      <div className="flex flex-col items-center mt-4">
        {rows.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((code) => (
              <img
                key={code}
                src={`https://flagcdn.com/24x18/${code.toLowerCase()}.png`}
                alt={code}
                className="h-6 w-8 mx-1 cursor-pointer"
                onClick={() => handleFlagClick(code)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoreCard;
