export interface Category {
  id: number;
  category: string;
  coupons: number;
}

interface StoreMetadata {
  id: number;
  country: string;
  language: string;
  metadata_title: string;
  metadata_description: string;
}

export interface Coupon {
  id: number;
  offer_id: number;
  title: string;
  description: string;
  label: string;
  code: string;
  featured: boolean;
  source: string;
  deeplink: string;
  affiliate_link: string;
  cashback_link: string;
  url: string;
  image_url: string;
  brand_logo: string;
  type: string;
  store: string;
  merchant_home_page: string;
  categories: string;
  standard_categories: string;
  start_date: string;
  end_date: string;
  status: string;
  primary_location: string;
  rating: number;
  table_name: string;
  total_coupons_count: string;
}

export interface Store {
  id: number;
  store: string;
  icon: string;
  previewDesktop: string;
  previewMobile: string;
  description: string;
  globalRank: number;
  countryAlpha2Code: string;
  countryRank: number;
  categoryRank: number;
  monthlyVisits: number;
  mainCategory: string;
  altTopics: string[];
  altCategories: string[];
  keywordsArr: string[];
  totalCountries: number;
  countries: string[];
  country_language: string[];
  coupons: Coupon[];
  storeMetadata: StoreMetadata[];
}
