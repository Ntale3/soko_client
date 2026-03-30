import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  fetchFarmerListings,
  fetchFarmerProfile,
  fetchFarmerReviews,
  fetchMyOrders,
  fetchMyPayouts,
  rateFarmer,
  updateMyProfile,
} from "@/api/profile-api";
import { useAuthStore } from "@/store/auth-store";
import { FarmerProfile } from "@/types/profile";

// ───> Public farmer profile

export function useFarmerProfile(id: string) {
  return useQuery({
    queryKey: ["farmer", id],
    queryFn: () => fetchFarmerProfile(id),
    staleTime: 1000 * 60 * 5,
  });
}

export function useFarmerListings(farmerId: string) {
  return useQuery({
    queryKey: ["farmer-listings", farmerId],
    queryFn: () => fetchFarmerListings(farmerId),
  });
}

export function useFarmerReviews(farmerId: string) {
  return useQuery({
    queryKey: ["farmer-reviews", farmerId],
    queryFn: () => fetchFarmerReviews(farmerId),
  });
}

// ───> Rate a farmer (optimistic)

export function useRateFarmer(farmerId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ rating, body }: { rating: number; body: string }) =>
      rateFarmer(farmerId, rating, body),

    onMutate: async ({ rating }) => {
      await queryClient.cancelQueries({ queryKey: ["farmer", farmerId] });
      const previous = queryClient.getQueryData<FarmerProfile>(["farmer", farmerId]);
      queryClient.setQueryData<FarmerProfile>(["farmer", farmerId], (old) =>
        old ? { ...old, isRatedByMe: rating } : old
      );
      return { previous };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.previous) queryClient.setQueryData(["farmer", farmerId], ctx.previous);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["farmer", farmerId] });
      queryClient.invalidateQueries({ queryKey: ["farmer-reviews", farmerId] });
    },
  });
}

// ───> My orders (buyer)

export function useMyOrders() {
  return useQuery({
    queryKey: ["my-orders"],
    queryFn: fetchMyOrders,
  });
}

// ───> My payouts (farmer)

export function useMyPayouts() {
  return useQuery({
    queryKey: ["my-payouts"],
    queryFn: fetchMyPayouts,
  });
}

// ───> Update profile

export function useUpdateProfile() {
  const queryClient = useQueryClient();
  const { updateProfile } = useAuthStore();

  return useMutation({
    mutationFn: (patch: Record<string, string>) => updateMyProfile(patch),
    onMutate: (patch) => updateProfile(patch as any), // optimistic
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["me"] }),
  });
}
