"use client";
import { ShippingAddressSchema } from "@/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Banknote, CreditCard } from "lucide-react";
import {
  ORDER_QUERY_KEY,
  useCheckoutOrderCard,
  useCheckoutOrderCash,
} from "@/hooks/useOrder";
import { queryClient } from "@/lib/react-query/client";
import { CART_QUERY_KEY } from "@/hooks/useCart";
import { useRouter } from "next/navigation";

type CheckoutFormType = z.infer<typeof ShippingAddressSchema>;
type PaymentMethod = "cash" | "card";

export default function CheckoutForm({ totalPrice }: { totalPrice: number }) {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod | null>(null);
  const [validShippingData, setValidShippingData] =
    useState<CheckoutFormType | null>(null);

  const router = useRouter();

  const form = useForm<CheckoutFormType>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: {
      city: "",
      country: "",
      postalCode: "",
      street: "",
    },
  });
  const onSubmit = (values: CheckoutFormType) => {
    console.log("values", values);
    setShowPaymentDialog(true);
    setValidShippingData(values);
  };
  const handlePaymentSelection = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
  };

  const handleDialogClose = () => {
    setShowPaymentDialog(false);
    setSelectedPaymentMethod(null);
  };

  const checkoutCard = useCheckoutOrderCard();
  const checkoutCash = useCheckoutOrderCash();

  const handlePaymentSubmit = () => {
    if (!validShippingData) return;

    if (selectedPaymentMethod === "card") {
      checkoutCard.mutate({
        shippingAddress: {
          ...validShippingData,
          postalCode: Number(validShippingData.postalCode),
        },
      });

      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: CART_QUERY_KEY });
    }
    if (selectedPaymentMethod === "cash") {
      checkoutCash.mutate({
        shippingAddress: {
          ...validShippingData,
          postalCode: Number(validShippingData.postalCode),
        },
      });
      queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
      queryClient.resetQueries({ queryKey: CART_QUERY_KEY });
    }
  };

  // Handle success for cash payments - redirect to order page
  if (checkoutCash.isSuccess) {
    setShowPaymentDialog(false);
    router.push(`/orders/${checkoutCash.data.id}`);
    queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
    queryClient.resetQueries({ queryKey: CART_QUERY_KEY });
  }

  // Handle success for card payments - dialog will close, redirect handled in hook
  if (checkoutCard.isSuccess) {
    setShowPaymentDialog(false);
    // Redirect to session_url is handled in the hook
    // If no session_url, redirect to order details
    if (!checkoutCard.data.session_url) {
      router.push(`/orders/${checkoutCard.data.id}`);
    }
    queryClient.invalidateQueries({ queryKey: ORDER_QUERY_KEY });
    queryClient.resetQueries({ queryKey: CART_QUERY_KEY });
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">Shipping Address</h2>
            <FormField
              control={form.control}
              name="street"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Street Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input placeholder="PS" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input placeholder="New York" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Postal Code</FormLabel>
                    <FormControl>
                      <Input placeholder="10001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="pt-4 border-t">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={checkoutCard.isPending || checkoutCash.isPending}
            >
              Complete Order (${totalPrice})
            </Button>
          </div>
        </form>
      </Form>

      {/* Payment Method Dialog */}

      <Dialog open={showPaymentDialog} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Payment Method</DialogTitle>
            <DialogDescription>
              Select how you would like to pay for your order of ${totalPrice}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-4">
            <Button
              variant={selectedPaymentMethod === "cash" ? "default" : "outline"}
              className="h-20 flex-col gap-2"
              onClick={() => handlePaymentSelection("cash")}
            >
              <Banknote className="size-6" />
              <span>Cash</span>
            </Button>

            <Button
              variant={selectedPaymentMethod === "card" ? "default" : "outline"}
              className="h-20 flex-col gap-2"
              onClick={() => handlePaymentSelection("card")}
            >
              <CreditCard className="size-6" />
              <span>Card</span>
            </Button>
          </div>
          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={handleDialogClose}
              className="w-full sm:w-auto"
            >
              Back to Shipping
            </Button>
            <Button
              onClick={handlePaymentSubmit}
              disabled={
                !selectedPaymentMethod ||
                checkoutCard.isPending ||
                checkoutCash.isPending
              }
              className="w-full sm:w-auto"
            >
              {checkoutCard.isPending || checkoutCash.isPending
                ? "Processing..."
                : "Complete Order"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
