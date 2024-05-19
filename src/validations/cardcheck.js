import { z } from "zod";

export const cardCheckSchema = z
  .object({
    cardnumber: z.string().min(19, "Invalid size, must have 16 numbers").max(19, "Invalid size, must have 16 numbers"),

    cvc: z.string().min(2, "Must have three numbers").max(3, "Must have three numbers"),

    monthexp: z.string().min(2, "Must have two numbers").max(2, "Must have two numbers"),

    name: z
      .string()
      .min(2, "Name must contain at least 2 letters")
      .regex(/^[ a-z]+$/i, "Only letters are allowed"),

    yearexp: z.string().min(2, "Must have two numbers").max(2, "Must have two numbers"),
  })
  .strict();
