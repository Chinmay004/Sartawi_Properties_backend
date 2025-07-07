export interface PropertyRecord {
  id: number;
  propertyId: string;
  title: string;
  description: string;
  price: number;
  bedrooms: number | null;
  propertyType: string[];
  region: string;
  cityName: string;
  developer: string;
  listingType: string;
  status: string;
  amenities: string[];
  images: string[];
}
