// src/types/Property.ts
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

  // FEATURES
  features: {
    BHK: number;
    area: number;
    parking: boolean;
    furnished: "Furnished" | "Semi-Furnished" | "Unfurnished";
    bathrooms: number;
    balconies: number;
  };

  status: "For Sale" | "For Rent" | "Sold";

  images: { url: string; public_id: string }[];
  videos: { url: string; public_id: string }[];

  amenities: string[];
  extraInfo?: Record<string, any>;
  // NEW FIELDS (missing earlier)
  propertyId: string;
  availableFrom: string; // ISO date string

  location?: {
    type: "Point";
    coordinates: [number, number]; // [lng, lat]
  };

  owner?: {
    _id: string;
    name: string;
    email: string;
    role: string;
  };

  slug: string;
  createdAt: string;
  updatedAt: string;
}
