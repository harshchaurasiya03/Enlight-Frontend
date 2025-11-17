export interface Property {
  _id: string;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  country: string;
  price: number;
  propertyType: string;
  status: string;
  images: any[];
  videos: any[];
  amenities: string[];
  features: Record<string, any>;
  location?: {
    type: string;
    coordinates: number[];
  };
  owner?: any;
  slug: string;
  createdAt: string;
  updatedAt: string;
}
