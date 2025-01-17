import { z } from "zod";

export function validatePassword(password) {
  const requiredPassword = z
    .string()
    .min(5)
    .max(30)
    .refine((password) => /[A-Z]+/.test(password), {
      message: "Password must contain 1 capital character.",
    })
    .refine((password) => /[a-z]+/.test(password), {
      message: "Password must contain 1 lowercase character.",
    })
    .refine((password) => /[0-9]+/.test(password), {
      message: "Password must contain 1 number.",
    })
    .refine((password) => /[!#$^"&@_/]+/.test(password), {
      message: "Password must contain 1 special character.",
    });

  const parsedPassword = requiredPassword.safeParse(password);

  if (!parsedPassword.success) {
    return parsedPassword.error.issues[0].message;
  } else {
    return null;
  }
}
