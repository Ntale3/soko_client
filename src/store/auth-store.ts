//Mock auth store — replace setUser() calls with your real auth flow.
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { AuthenticatedUser, ThemePreference, UserSettings } from "@/types/profile";

//  Mock users (swap with real JWT/session)

export const MOCK_BUYER: AuthenticatedUser = {
  id: "u1",
  name: "Amina Kasozi",
  initials: "AK",
  email: "amina@example.com",
  phone: "+256 700 123 456",
  district: "Kampala",
  village: "Nakasero",
  role: "buyer",
  verified: true,
  verificationStatus: "verified",
  memberSince: "2024-03-01T00:00:00Z",
  totalOrders: 12,
  totalSpent: 480_000,
  wishlistCount: 8,
};

export const MOCK_FARMER: AuthenticatedUser = {
  id: "u2",
  name: "Okello James",
  initials: "OJ",
  email: "okello@example.com",
  phone: "+256 772 456 789",
  district: "Gulu",
  village: "Lacor",
  role: "farmer",
  verified: true,
  verificationStatus: "verified",
  memberSince: "2023-06-15T00:00:00Z",
  farmName: "Lacor Green Farm",
  farmerBio:
    "Third-generation farmer specialising in sun-dried grains and legumes. Supplying markets across northern Uganda since 2018.",
  totalListings: 6,
  totalSales: 18_400,
  totalEarned: 15_640_000,
  pendingPayout: 2_125_000,
  averageRating: 4.7,
  totalReviews: 142,
};

export const MOCK_BOTH: AuthenticatedUser = {
  id: "u3",
  name: "Sarah Nakato",
  initials: "SN",
  email: "sarah@example.com",
  phone: "+256 754 987 654",
  district: "Wakiso",
  role: "both",
  verified: false,
  verificationStatus: "pending",
  memberSince: "2025-01-10T00:00:00Z",
  totalOrders: 5,
  totalSpent: 210_000,
  totalListings: 2,
  totalSales: 800,
  totalEarned: 960_000,
  pendingPayout: 320_000,
  averageRating: 4.2,
  totalReviews: 18,
};

const DEFAULT_SETTINGS: UserSettings = {
  theme: "system",
  notificationsEmail: true,
  notificationsSms: true,
  notificationsPush: true,
  language: "en",
  currency: "UGX",
};

// ─── Store ────────────────────────────────────────────────────────────────────

interface AuthStore {
  user: AuthenticatedUser | null;
  settings: UserSettings;
  isLoading: boolean;

  // Auth actions (replace internals with real API calls)
  setUser: (user: AuthenticatedUser | null) => void;
  logout: () => void;

  // Settings
  updateSettings: (patch: Partial<UserSettings>) => void;
  setTheme: (theme: ThemePreference) => void;

  // Profile update
  updateProfile: (patch: Partial<AuthenticatedUser>) => void;

  // Helpers
  isFarmer: () => boolean;
  isBuyer: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Default to mock farmer so the profile page works immediately
      // Replace with null and populate from your real auth flow
      user: MOCK_FARMER,
      settings: DEFAULT_SETTINGS,
      isLoading: false,

      setUser: (user) => set({ user }),
      logout: () => set({ user: null }),

      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      setTheme: (theme) => set((s) => ({ settings: { ...s.settings, theme } })),

      updateProfile: (patch) =>
        set((s) => ({
          user: s.user ? { ...s.user, ...patch } : null,
        })),

      isFarmer: () => {
        const { role } = get().user ?? {};
        return role === "farmer" || role === "both";
      },

      isBuyer: () => {
        const { role } = get().user ?? {};
        return role === "buyer" || role === "both";
      },
    }),
    {
      name: "soko-auth",
      partialize: (s) => ({ user: s.user, settings: s.settings }),
    }
  )
);
