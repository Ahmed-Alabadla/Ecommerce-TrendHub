"use client";
import Loading from "@/app/loading";
import { usePasswordStrength } from "@/hooks/use-password-strength";
import {
  PROFILE_QUERY_KEY,
  useChangePassword,
  useDeleteProfile,
  useProfile,
  useUpdateProfile,
} from "@/hooks/useProfile";
import { ChangePasswordSchema, ProfileSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { getCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ImageDropzone } from "../shared/ImageDropzone";
import { DatePicker } from "../shared/DatePicker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { logout } from "@/actions/auth";
import { queryClient } from "@/lib/react-query/client";

type ProfileFormValues = z.infer<typeof ProfileSchema>;
type ChangePasswordFormValues = z.infer<typeof ChangePasswordSchema>;

export default function Profile() {
  const router = useRouter();
  const token = getCookie("access_token");
  const { data: profile, isPending, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const deleteProfile = useDeleteProfile();

  const profileForm = useForm<ProfileFormValues>({
    resolver: zodResolver(ProfileSchema),
    defaultValues: {
      address: profile?.address || undefined,
      avatar: profile?.avatar || undefined,
      birth_date: profile?.birth_date || undefined,
      gender: (profile?.gender as "male" | "female") || undefined,
      name: profile?.name,
      phone: profile?.phone || undefined,
    },
  });
  const changePasswordForm = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(ChangePasswordSchema),
  });

  const passwordValue = changePasswordForm.watch("newPassword") || "";
  const { message, getColor, getPercentage } =
    usePasswordStrength(passwordValue);

  const onSubmitUpdateProfile = (data: ProfileFormValues) => {
    updateProfile.mutate(data);
  };
  const onSubmitChangePassword = (data: ChangePasswordFormValues) => {
    changePassword.mutate({
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    });
  };

  // Delete profile
  const handleDeleteProfile = async () => {
    deleteProfile.mutate();
    // Clear only the profile cache when logging out
    queryClient.removeQueries({ queryKey: PROFILE_QUERY_KEY });
    await logout().then(() => {
      toast.success("Logout successful!", {
        description: "You have been logged out successfully.",
      });

      router.push("/");
    });
  };

  if (!token) {
    router.push("/");
    return null;
  }

  if (error) {
    toast.error("Failed to load profile", {
      description: "There was an error loading your profile. Please try again.",
    });
  }
  if (isPending) {
    return <Loading />;
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account information</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <Form {...profileForm}>
          <form
            onSubmit={profileForm.handleSubmit(onSubmitUpdateProfile)}
            className="space-y-4"
          >
            <FormField
              control={profileForm.control}
              name="avatar"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar</FormLabel>
                  <FormControl>
                    <ImageDropzone
                      width={250}
                      height={250}
                      value={field.value}
                      onChange={(file) => {
                        field.onChange(file);
                      }}
                      disabled={updateProfile.isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium">Profile Information</h3>
                <p className="text-sm text-muted-foreground">
                  Update your account details
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={updateProfile.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      readOnly
                      defaultValue={profile?.email}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue={profile?.role} readOnly />
                  </div>
                  <FormField
                    control={profileForm.control}
                    name="birth_date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="date">Birth Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            selected={
                              field.value ? new Date(field.value) : undefined
                            }
                            onChange={field.onChange}
                            disabled={updateProfile.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={profileForm.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            {...field}
                            value={field.value!}
                            disabled={updateProfile.isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={profileForm.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                            disabled={updateProfile.isPending}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                            <SelectContent className="w-full">
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={profileForm.control}
                  name="address"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter address"
                          {...field}
                          disabled={updateProfile.isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                type="submit"
                disabled={
                  updateProfile.isPending || !profileForm.formState.isDirty
                }
              >
                {updateProfile.isPending ? "Processing..." : "Update Profile"}
              </Button>
            </div>
          </form>
        </Form>
        <Separator className="dark:bg-gray-500" />

        <form
          onSubmit={changePasswordForm.handleSubmit(onSubmitChangePassword)}
          className="space-y-4"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Password</h3>
              <p className="text-sm text-muted-foreground">
                Change your password
              </p>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  {...changePasswordForm.register("oldPassword")}
                  placeholder="Password"
                  disabled={changePassword.isPending}
                />
                {changePasswordForm.formState.errors.oldPassword && (
                  <p className="text-sm text-red-500">
                    {changePasswordForm.formState.errors.oldPassword.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  {...changePasswordForm.register("newPassword")}
                  placeholder="Password"
                  disabled={changePassword.isPending}
                />
                {passwordValue && (
                  <div className="mt-1">
                    <div className="h-1 w-full bg-gray-200">
                      <div
                        className={`h-full transition-all duration-300 ${getColor()}`}
                        style={{ width: getPercentage() }}
                      />
                    </div>
                    {message && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        {message}
                      </p>
                    )}
                  </div>
                )}
                {changePasswordForm.formState.errors.newPassword && (
                  <p className="text-sm text-red-500">
                    {changePasswordForm.formState.errors.newPassword.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  {...changePasswordForm.register("confirmPassword")}
                  placeholder="Password"
                  disabled={changePassword.isPending}
                />
                {changePasswordForm.formState.errors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {
                      changePasswordForm.formState.errors.confirmPassword
                        .message
                    }
                  </p>
                )}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={
                changePassword.isPending ||
                !changePasswordForm.formState.isDirty
              }
            >
              {changePassword.isPending ? "Processing..." : "Change Password"}
            </Button>
          </div>
        </form>

        <Separator className="dark:bg-gray-500" />

        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-medium text-red-600">Danger Zone</h3>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and all associated data
            </p>
          </div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" disabled={deleteProfile.isPending}>
                {deleteProfile.isPending ? "Deleting..." : "Delete Account"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove all your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteProfile}
                  className="bg-red-600  dark:bg-red-500"
                >
                  Delete Account
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
