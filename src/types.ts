export type FeatureCategory = 'Sustainable Living' | 'Modern Architecture' | 'Energy Efficiency';

export interface Hotspot {
  id: string;
  x: number; // percentage from left
  y: number; // percentage from top
  title: string;
  tag: string;
  description: string;
  metric: string;
  iconName: string;
}

export interface MaterialItem {
  id: string;
  name: string;
  origin: string;
  ecoRating: string;
  carbonOffset: string;
  description: string;
  image: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
  expertise: string;
}

export interface PropertyItem {
  id: string;
  title: string;
  category: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  sqft: number;
  rating: number;
  image: string;
  description: string;
  tags: string[];
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  project: string;
}

export interface LoanOption {
  id: string;
  title: string;
  rate: string;
  description: string;
  badge: string;
}

