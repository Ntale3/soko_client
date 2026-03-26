export interface Product {
  // Identification
  id: string | number;
  name: string;
  category: string;
  description: string; // Added from second snippet
  listedAt: string; // ISO date string

  // Visuals & Branding
  image: string; // Standard URL or Emoji
  img: string; // Alias for compatibility
  badge?: string; // e.g., "Fresh", "Hot", "Organic"

  // Supplier Info
  farmer: string;
  district: string;
  verified: boolean;

  // Pricing
  price: number; // Raw UGX value
  priceValue: number; // Duplicate for logic/sorting
  unit: string; // e.g., "kg", "crate", "bunch"

  // Stock & Quality
  qty: number; // Numeric for inventory math
  qtyDisplay: string; // Formatted: "5,000 kg available"
  rating: number; // 0–5 decimal
  fresh: boolean;
}

export const categories = [
  "All",
  "Vegetables",
  "Fruits",
  "Grains & Cereals",
  "Livestock",
  "Dairy & Eggs",
  "Herbs & Spices",
];

export const districts = [
  "Kampala",
  "Wakiso",
  "Mukono",
  "Jinja",
  "Mbale",
  "Gulu",
  "Mbarara",
  "Kasese",
  "Lira",
  "Soroti",
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Fresh Tomatoes",
    category: "Vegetables",
    description:
      "Sun-ripened tomatoes harvested daily from our organic farm. No pesticides, firm and full of flavour.",
    listedAt: "2026-03-22T10:00:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🍅",
    badge: "Best Seller",
    farmer: "Nakato Rose",
    district: "Wakiso",
    verified: true,
    price: 3500,
    priceValue: 3500,
    unit: "kg",
    qty: 120,
    qtyDisplay: "120 kg available",
    rating: 4.8,
    fresh: true,
  },
  {
    id: "p2",
    name: "Matooke (Cooking Bananas)",
    category: "Fruits",
    description:
      "Large, starchy matooke bunches harvested at peak ripeness. Perfect for steaming or boiling.",
    listedAt: "2026-03-20T08:30:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🍌",
    badge: "Fresh",
    farmer: "Ssebulime Paul",
    district: "Mbarara",
    verified: true,
    price: 12000,
    priceValue: 12000,
    unit: "bunch",
    qty: 45,
    qtyDisplay: "45 bunches available",
    rating: 4.6,
    fresh: true,
  },
  {
    id: "p3",
    name: "Organic Maize Flour",
    category: "Grains & Cereals",
    description:
      "Stone-ground maize flour from open-pollinated heritage varieties. Rich, nutty flavour — great for posho and ugali.",
    listedAt: "2026-03-18T14:15:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🌽",
    badge: "Organic",
    farmer: "Opio Francis",
    district: "Gulu",
    verified: true,
    price: 4200,
    priceValue: 4200,
    unit: "kg",
    qty: 500,
    qtyDisplay: "500 kg available",
    rating: 4.9,
    fresh: false,
  },
  {
    id: "p4",
    name: "Free-Range Eggs",
    category: "Dairy & Eggs",
    description:
      "Eggs from hens raised on open pasture. Deep-orange yolks and noticeably richer taste.",
    listedAt: "2026-03-21T07:00:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🥚",
    badge: "Pasture Raised",
    farmer: "Apio Grace",
    district: "Lira",
    verified: false,
    price: 700,
    priceValue: 700,
    unit: "egg",
    qty: 300,
    qtyDisplay: "300 eggs available",
    rating: 4.7,
    fresh: true,
  },
  {
    id: "p5",
    name: "Sweet Pineapples",
    category: "Fruits",
    description:
      "Kayinja variety pineapples — extra sweet, low acid. Harvested to order so they arrive at peak ripeness.",
    listedAt: "2026-03-19T11:45:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🍍",
    badge: "Sweet",
    farmer: "Namukasa Judith",
    district: "Mukono",
    verified: true,
    price: 5000,
    priceValue: 5000,
    unit: "piece",
    qty: 80,
    qtyDisplay: "80 pieces available",
    rating: 4.5,
    fresh: true,
  },
  {
    id: "p6",
    name: "Fresh Ginger Root",
    category: "Herbs & Spices",
    description:
      "Pungent, high-oil ginger from the foothills of Mount Elgon. Excellent for teas, cooking, and export.",
    listedAt: "2026-03-17T09:20:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🫚",
    badge: "Export Grade",
    farmer: "Mutumba David",
    district: "Mbale",
    verified: true,
    price: 8000,
    priceValue: 8000,
    unit: "kg",
    qty: 50,
    qtyDisplay: "50 kg available",
    rating: 4.9,
    fresh: true,
  },
  {
    id: "p7",
    name: "Live Broiler Chickens",
    category: "Livestock",
    description:
      "8-week broilers raised on a balanced diet of maize and soy. Slaughter weight 2.2–2.8 kg.",
    listedAt: "2026-03-15T16:00:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🐔",
    badge: "Healthy",
    farmer: "Byaruhanga Amos",
    district: "Kasese",
    verified: false,
    price: 28000,
    priceValue: 28000,
    unit: "bird",
    qty: 25,
    qtyDisplay: "25 birds available",
    rating: 4.4,
    fresh: true,
  },
  {
    id: "p8",
    name: "Sukuma Wiki (Kale)",
    category: "Vegetables",
    description:
      "Crisp, dark-green kale bunches cut fresh each morning. High iron content, ideal for daily cooking.",
    listedAt: "2026-03-23T06:15:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🥬",
    badge: "Freshly Cut",
    farmer: "Akello Betty",
    district: "Soroti",
    verified: true,
    price: 1500,
    priceValue: 1500,
    unit: "bunch",
    qty: 200,
    qtyDisplay: "200 bunches available",
    rating: 4.6,
    fresh: true,
  },
  {
    id: "p9",
    name: "Sorghum Grain",
    category: "Grains & Cereals",
    description:
      "Drought-tolerant red sorghum, clean and sun-dried. Suitable for brewing, porridge, and animal feed.",
    listedAt: "2026-03-16T13:00:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🌾",
    badge: "Sun Dried",
    farmer: "Okello Martin",
    district: "Lira",
    verified: true,
    price: 2800,
    priceValue: 2800,
    unit: "kg",
    qty: 1000,
    qtyDisplay: "1,000 kg available",
    rating: 4.3,
    fresh: false,
  },
  {
    id: "p10",
    name: "Fresh Cow Milk",
    category: "Dairy & Eggs",
    description:
      "Full-cream raw milk from Ankole long-horn cattle. Collected twice daily and chilled immediately.",
    listedAt: "2026-03-24T05:45:00Z",
    image: "https://i.pinimg.com/736x/11/9c/ea/119cea4b403ddcfcba404b6e58ddff0d.jpg",
    img: "🥛",
    badge: "Morning Collection",
    farmer: "Tumwesigye Robert",
    district: "Mbarara",
    verified: true,
    price: 1800,
    priceValue: 1800,
    unit: "litre",
    qty: 60,
    qtyDisplay: "60 litres available",
    rating: 4.8,
    fresh: true,
  },
];
