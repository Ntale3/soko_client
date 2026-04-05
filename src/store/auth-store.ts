//Mock auth store — replace setUser() calls with your real auth flow.
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { api } from "@/api/api";
import {
  AuthenticatedUser,
  AuthTokens,
  LoginPayload,
  RegisterPayload,
  ThemePreference,
  UserSettings,
} from "@/types/profile";
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
  token: string | null;
  isLoading: boolean;
  error: string | null;
  settings: UserSettings;

  //Actions
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  updateSettings: (patch: Partial<UserSettings>) => void;

  //Helpers
  isFarmer: () => boolean;
  isBuyer: () => boolean;
  isBoth: () => boolean;
  isAuthenticated: () => boolean;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: MOCK_BUYER,
      token: null,
      isLoading: false,
      error: null,
      settings: DEFAULT_SETTINGS,
      theme: "",

      //Login
      login: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const tokens = await api.post<AuthTokens>("auth/login", payload);
          const user = await api.get<AuthenticatedUser>("/auth/me", tokens.access_token);

          set({ user, token: tokens.access_token, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
          throw err;
        }
      },

      //Register
      register: async (payload) => {
        set({ isLoading: true, error: null });
        try {
          const tokens = await api.post<AuthTokens>("/auth/register", payload);
          const user = await api.get<AuthenticatedUser>("/auth/me", tokens.access_token);
          set({ user, token: tokens.access_token, isLoading: false });
        } catch (err) {
          set({ error: (err as Error).message, isLoading: false });
          throw err;
        }
      },

      //Logout
      logout: () => set({ user: null, token: null, error: null }),

      //Settings Update
      updateSettings: (patch) => set((s) => ({ settings: { ...s.settings, ...patch } })),

      clearError: () => set({ error: null }),

      // Helpers
      isFarmer: () => {
        const role = get().user?.role;
        return role === "farmer";
      },

      isBuyer: () => {
        const role = get().user?.role;
        return role === "buyer";
      },

      isBoth: () => {
        const role = get().user?.role;
        return role === "buyer";
      },

      isAuthenticated: () => !!get().token && !!get().user,
    }),
    {
      name: "soko-auth",
      partialize: (s) => ({ user: s.user, settings: s.settings, token: s.token }),
    }
  )
);
