"use client";

import { siginUpSchema, SiginUpValues } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import { signup } from "./action";
import { PasswordInput } from "@/components/PasswordInput";
import LodingButton from "@/components/LodingButton";

export default function SignUpForm() {
  const form = useForm<SiginUpValues>({
    resolver: zodResolver(siginUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const [error, setError] = useState<string>();
  const [isPending, startTransition] = useTransition();

  async function onSubmit(values: SiginUpValues) {
    setError(undefined);
    startTransition(async () => {
      const { error } = await signup(values);
      if (error) setError(error);
    });
    //
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {error && <p className="text-center text-destructive"> {error}</p>}
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <h1 className="text-sm font-semibold">Kulanıcı adı</h1>
              <FormControl>
                <Input placeholder="kulanıcı adı" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <h1 className="text-sm font-semibold">E-posta</h1>
              <FormControl>
                <Input placeholder="e-posta" {...field} />
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
              <h1 className="text-sm font-semibold">Sifre</h1>
              <FormControl>
                <PasswordInput placeholder="sifre" type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <LodingButton className="w-full" type="submit" loading={isPending}>
          Hesap Oluştur
        </LodingButton>
      </form>
    </Form>
  );
}
