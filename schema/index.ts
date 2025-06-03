import { z } from "zod";
const imageUrlPattern = /\.(jpeg|jpg|gif|png|webp)$/i;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
  "image/jpg",
] as const;

const imageSchema = z.union(
  [
    z.string().refine(
      (value) => {
        if (!value) return true;

        if (value.startsWith("http")) {
          try {
            new URL(value);
            return (
              imageUrlPattern.test(value) ||
              /\/image\//i.test(value) ||
              /res.cloudinary/i.test(value) ||
              /lh3.googleusercontent/i.test(value)
            );
          } catch {
            return false;
          }
        }

        return value;
      },
      { message: "Please provide a valid image URL or file" }
    ),
    z
      .instanceof(File)
      .refine(
        (file) => file.size <= MAX_FILE_SIZE, //  limit file size to 2MB
        { message: "File must be less than 2MB" }
      )
      .refine(
        (file) =>
          ACCEPTED_IMAGE_TYPES.includes(
            file.type as (typeof ACCEPTED_IMAGE_TYPES)[number]
          ),
        {
          message:
            "Only .jpg, .jpeg, .png, .gif and .webp formats are supported.",
        }
      ),
  ],
  { message: "Please provide a valid image URL or file" }
);

export const ReviewSchema = z.object({
  rating: z
    .number()
    .min(1, "Rating is required")
    .max(5, "Rating must be 5 or less"),
  comment: z
    .string()
    .min(10, "Comment must be at least 10 characters long")
    .optional(),
});

export const ShippingAddressSchema = z.object({
  country: z.string().min(1, "Country is required"),
  city: z.string().min(2, { message: "Please enter your city." }),
  street: z.string().min(5, { message: "Please enter your street address." }),
  postalCode: z
    .string()
    .min(5, "Please enter a valid postal code. (Min 5 chars)"),
});

export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const RegisterSchema = z
  .object({
    name: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ForgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

export const ResetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const ProfileSchema = z.object({
  name: z
    .string()
    .min(3, "Full name must be at least 3 characters")
    .max(100, "Full name must be at most 100 characters")
    .optional(),

  phone: z
    .string()
    .min(6, { message: "Phone number must be at least 6 characters long" })
    .max(20, { message: "Phone number must be at most 20 characters long" })
    .regex(/^\+\d{6,}$/, {
      message:
        "phone must be a valid international number with country code (e.g., +970597762451)",
    })
    .optional(),

  avatar: imageSchema.optional(),

  address: z
    .string()
    .min(6, "Address must be at least 6 characters long")
    .max(255, "Address must be at most 255 characters long")
    .optional(),

  birth_date: z
    .union([z.date(), z.string()])
    .optional()

    .refine(
      (date) => {
        if (!date) return true; // Allow null values if needed
        if (typeof date === "string") {
          return new Date(date) < new Date();
        }
        return date < new Date();
      },
      {
        message: "Date of birth can't be today or in the future",
      }
    ),

  gender: z
    .enum(["male", "female"], {
      errorMap: () => ({ message: "Gender must be either male or female" }),
    })
    .optional(),
});

export const ChangePasswordSchema = z
  .object({
    oldPassword: z.string().min(6, "Password must be at least 6 characters"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must include uppercase, lowercase, and number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
