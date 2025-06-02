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
