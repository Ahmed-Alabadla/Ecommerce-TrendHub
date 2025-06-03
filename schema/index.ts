import { z } from "zod";

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
