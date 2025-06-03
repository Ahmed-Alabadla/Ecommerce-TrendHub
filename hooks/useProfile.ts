import { useMutation, useQuery } from "@tanstack/react-query";
import {
  apiChangePassword,
  apiDeleteProfile,
  apiProfile,
  apiUpdateProfile,
} from "@/lib/queries/profile";
import { ChangePasswordDto, UpdateProfileDto } from "@/types/user";
import { queryClient } from "@/lib/react-query/client";
import { toast } from "sonner";

// Query key constants
export const PROFILE_QUERY_KEY = ["profile"] as const;

// Get profile hook
export const useProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: apiProfile,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    retry: 1,
  });
};

// Update profile hook
export const useUpdateProfile = () => {
  return useMutation({
    mutationFn: (data: UpdateProfileDto) => apiUpdateProfile(data),
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast.success("Profile updated successfully!", {
        description: "Your profile information has been updated.",
      });
    },
    onError: (error) => {
      toast.error("Failed to update profile", {
        description:
          error.message ||
          "There was an error updating your profile. Please try again.",
      });
      console.error("Failed to update profile:", error);
    },
  });
};

// Change password hook
export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: ChangePasswordDto) => apiChangePassword(data),
    onSuccess: () => {
      toast.success("Password changed successfully!", {
        description: "Your password has been updated.",
      });
    },
    onError: (error) => {
      toast.error("Failed to change password", {
        description:
          "There was an error changing your password. Please try again.",
      });
      console.error("Failed to change password:", error);
    },
  });
};

// Delete profile hook
export const useDeleteProfile = () => {
  return useMutation({
    mutationFn: () => apiDeleteProfile(),
    onSuccess: () => {
      // Clear all cached data
      queryClient.clear();
      toast.success("Profile deleted successfully!", {
        description: "Your profile has been permanently deleted.",
      });
    },
    onError: (error) => {
      toast.error("Failed to delete profile", {
        description:
          "There was an error deleting your profile. Please try again.",
      });
      console.error("Failed to delete profile:", error);
    },
  });
};

// In a component
// const { data: profile, isLoading, error } = useProfile();
// const updateProfile = useUpdateProfile();
// const changePassword = useChangePassword();
// const deleteProfile = useDeleteProfile();

// // Update profile
// updateProfile.mutate({ name: "New Name" });

// // Change password
// changePassword.mutate({
//   current_password: "old",
//   new_password: "new"
// });

// // Delete profile

//     deleteProfile.mutate();
