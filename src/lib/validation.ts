import { z } from "zod";

const requiredString = z.string().min(1, "Zorunlu").trim();

export const siginUpSchema = z.object({
  email: requiredString.email("Gecersiz e-posta"),
  username: requiredString.regex(
    /^[a-zA-Z0-9_]{3,16}$/,
    "Kullanıcı adı 3-16 karakter arasında olmalı ve alfanumeric ve _ karakterlerinden oluşmalıdır.",
  ),
  password: requiredString.min(8, "min 8 karakterden oluşmalıdır"),
});

export type SiginUpValues = z.infer<typeof siginUpSchema>;

//

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;

//
