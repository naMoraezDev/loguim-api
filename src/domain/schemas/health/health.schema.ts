import { z } from "zod";

export const healthSchema = z.object({
  uptime: z.number(),
  message: z.string(),
  timestamp: z.number(),
});
