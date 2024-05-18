import { z } from 'zod';

export const cardCheckSchema = z
  .object({
    name: z
      .string()
      .min(2, 'Name must contain at least 2 letters')
      .regex(/^[A-Za-z ]+$/i, 'Only letters are allowed'),
    cardnumber: z.string().min(19, 'Invalid size, must have 16 numbers'),
    monthexp: z.number().min(2, 'Must have two numbers'),
    yearexp: z.number().min(2, 'Must have two numbers'),
    cvc: z.number().min(3, 'Must have three numbers'),
  })
  .strict();
