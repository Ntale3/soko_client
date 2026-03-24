export interface PricePrediction {
  crop: string;
  current: string;
  predicted: string;
  trend: "up" | "down";
  confidence: number;
}

export interface Farmer {
  id: number;
  name: string;
  avatar: string;
  avatarUrl?: string;
  verified: boolean;
  badge: string;
  location: string;
  rating: number;
  produce: string[];
  online?: boolean;
  reviews?: number;
  price?: string;
}

export interface Product {
  id: number;
  name: string;
  farmer: string;
  img: string;
  badge?: string;
  price: string;
  rating: number;
  qty: string;
}

export interface MarketProduct {
  id: number;
  name: string;
  farmer: string;
  img: string;
  badge?: string;
  price: string;
  priceValue: number; // raw number for price range filter
  rating: number;
  qty: string;
  category: string;
}

export interface Article {
  id: number;
  img: string;
  tag: string;
  title: string;
  author: string;
  readTime: string;
}
