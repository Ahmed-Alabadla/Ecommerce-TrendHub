"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoginSchema } from "@/schema";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AtSign, Loader2, Lock, LogIn } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import GoogleLoginButton from "./GoogleLoginButton";
import { login } from "@/actions/auth";
import { toast } from "sonner";
import { redirect, useRouter, useSearchParams } from "next/navigation";

type LoginFormValues = z.infer<typeof LoginSchema>;
function LoginForm() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");
  const router = useRouter();

  if (message) {
    console.log("LoginForm rendered with message:", message);
    toast.success(message, {
      description: "You can now log in with your new account.",
    });
    router.replace("/auth/login");
  }

  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormValues) {
    startTransition(() => {
      login(values).then((res) => {
        if (res?.error) {
          toast.error(res.error, {
            description: "Please check your credentials and try again.",
          });
          return;
        }

        if (res?.success) {
          form.reset();
          toast.success(res.success, {
            description: "You have successfully logged in.",
          });
          redirect("/");
        }
      });
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <div className="relative">
                    <AtSign className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="name@example.com"
                      className="pl-9"
                      {...field}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    href="forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute left-2.5 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="••••••••"
                      className="pl-9"
                      {...field}
                      disabled={isPending}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <LogIn className="mr-2 h-4 w-4" />
                Sign in
              </>
            )}
          </Button>
        </form>
      </Form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t"></div>
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <GoogleLoginButton />
    </>
  );
}

export default LoginForm;
