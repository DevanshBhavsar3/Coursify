import { z } from "zod";

export function validateUsername(username) {
  const requiredUsername = z
    .string()
    .min(3)
    .max(100)
    .refine((username) => !RegExp("[^a-zA-Z0-9_]").test(username), {
      message: "Username must not contain any special characters.",
    });

  const parsedUsername = requiredUsername.safeParse(username);

  if (!parsedUsername.success) {
    return parsedUsername.error.issues[0].message;
  } else {
    return null;
  }
}
