import { z } from 'zod';

export const pingParamSchema = z.object({
  host: z.string().min(1, 'Host is required'),
});
