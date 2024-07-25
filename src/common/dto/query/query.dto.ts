import { z } from "zod";

import { SortValuesEnum } from "src/types";

export const querySchema = z.object({
  offset: z.coerce.number(),
  limit: z.coerce.number(),
  priceFrom: z.coerce.number().optional(),
  priceTo: z.coerce.number().optional(),
  title: z.string().optional(),
  categories: z.array(z.number()).optional(),
  colors: z.array(z.coerce.number()).optional(),
  sizes: z.array(z.coerce.number()).optional(),
  types: z.array(z.coerce.number()).optional(),
  discount: z.coerce.boolean().optional(),
  sort: z.nativeEnum(SortValuesEnum).optional(),
  categoryId: z.coerce.number().optional(),
});

export type QueryDto = z.infer<typeof querySchema>;
