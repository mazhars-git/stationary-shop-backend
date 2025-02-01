import { z } from 'zod';

const userValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: 'Name must be provided and must be a string',
      }),

    email: z
      .string({
        required_error: 'Email must be provided and must be a string',
      })
      .email('Email must be a valid email address'),

    password: z
      .string({
        required_error: 'Password is required for your safety',
      })
  }),
});

export const UserValidation = {
  userValidationSchema,
};
