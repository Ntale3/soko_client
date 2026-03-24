export interface Farmer {
  id: number;
  name: string;
  avatar: string;
  avatarUrl?: string;
  verified: boolean;
  badge: string;
  location: string;
  rating: number;
  reviews: number;
  price: string;
  produce: string[];
  online?: boolean;
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
