import { z } from "zod";

import { SortValuesEnum } from "src/types";

const parseArray = (str: string | undefined) => {
  if (!str) return undefined;
  try {
    const parsed = JSON.parse(str);
    if (Array.isArray(parsed)) {
      return parsed
        .map((item) => {
          if (typeof item === "number") {
            return item;
          } else if (typeof item === "string") {
            const num = Number(item);
            return isNaN(num) ? undefined : num;
          }
          return undefined;
        })
        .filter((item) => item !== undefined);
    }
  } catch (error) {
    console.error("🚀 ~ parseArray ~ error:", "Invalid JSON format:", error);

    return undefined;
  }
  return undefined;
};

export const querySchema = z.object({
  offset: z.coerce.number(),
  limit: z.coerce.number(),
  priceFrom: z.coerce.number().optional(),
  priceTo: z.coerce.number().optional(),
  title: z.string().optional(),
  categories: z.preprocess(parseArray, z.array(z.number()).optional()),
  colors: z.preprocess(parseArray, z.array(z.number()).optional()),
  sizes: z.preprocess(parseArray, z.array(z.number()).optional()),
  types: z.preprocess(parseArray, z.array(z.number()).optional()),
  discount: z.coerce.boolean().optional(),
  sort: z.nativeEnum(SortValuesEnum).optional(),
  categoryId: z.coerce.number().optional(),
});

export type QueryDto = z.infer<typeof querySchema>;
