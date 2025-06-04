"use client";
import { Star } from "lucide-react";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ReviewSchema } from "@/schema";
import { IReview } from "@/types/review";
import { useCreateReview, useUpdateReview } from "@/hooks/useReview";

interface ReviewFormProps {
  productId: number;
  productName: string;
  children: React.ReactNode;
  existingReview?: IReview;
  mode?: "create" | "edit";
}

type ReviewFormValues = z.infer<typeof ReviewSchema>;

export default function ReviewForm({
  productId,
  productName,
  children,
  existingReview,
  mode = "create",
}: ReviewFormProps) {
  const [open, setOpen] = React.useState(false);
  const [selectedRating, setSelectedRating] = React.useState(
    existingReview?.rating || 0
  );

  const form = useForm<ReviewFormValues>({
    defaultValues: {
      rating: existingReview?.rating || 0,
      comment: existingReview?.comment || "",
    },
  });

  React.useEffect(() => {
    if (existingReview) {
      setSelectedRating(existingReview.rating);
      form.reset({
        rating: existingReview.rating,
        comment: existingReview.comment,
      });
    }
  }, [existingReview, form]);

  const createReviewMutation = useCreateReview();
  const updateReviewMutation = useUpdateReview();
  // updateReviewMutation.mutate({ productId: 1, rating: 5, comment: "Updated comment" });

  const onSubmit = (data: ReviewFormValues) => {
    const reviewData = {
      ...data,
      rating: selectedRating,
    };
    if (mode === "create") {
      createReviewMutation.mutate({ productId, data: reviewData });
    }

    if (mode === "edit" && existingReview) {
      updateReviewMutation.mutate({
        reviewId: existingReview?.id,
        data: reviewData,
        productId,
      });
    }

    form.reset();
    setSelectedRating(0);
    // setOpen(false);
  };
  const StarRating = () => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setSelectedRating(star)}
            className="p-1 hover:scale-110 cursor-pointer transition-transform"
          >
            <Star
              className={`size-6 ${
                star <= selectedRating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
            />
          </button>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "edit" ? "Edit Your Review" : "Write a Review"}
          </DialogTitle>

          <DialogDescription>
            {mode === "edit" ? (
              <>
                <span>Update your review for </span>
                <span className="text-primary font-medium">{productName}</span>
              </>
            ) : (
              <>
                <span>Share your experience with </span>
                <span className="text-primary font-medium">{productName}</span>
              </>
            )}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="rating"
              render={() => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <div className="flex flex-col gap-2">
                      <StarRating />
                      <p className="text-sm text-gray-500">
                        {selectedRating > 0 &&
                          `${selectedRating} out of 5 stars`}
                      </p>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your experience with this product..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Share details about the quality, features, and your overall
                    experience.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={selectedRating === 0}>
                {mode === "edit" ? "Update Review" : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
