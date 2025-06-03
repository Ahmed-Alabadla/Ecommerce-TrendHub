export interface IUser {
  id: number;
  name: string;
  email: string;
  role: "admin" | "customer";
  isAccountVerified: boolean;
  avatar?: string | null;
  birth_date?: string | Date | null;
  phone?: string | null;
  address?: string | null;
  isActive?: boolean | undefined;
  gender?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileDto {
  name?: string;
  phone?: string;
  avatar?: string | File;
  address?: string;
  birth_date?: Date | string;
  gender?: string;
}
export interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
