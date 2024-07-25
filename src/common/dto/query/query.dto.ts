import { SortValuesEnum } from "src/types";

export class QueryDto {
  offset: number;
  limit: number;
  priceFrom?: number;
  priceTo?: number;
  title?: string;
  categories?: string;
  colors?: string;
  sizes?: string;
  types?: string;
  discount?: boolean;
  sort?: SortValuesEnum;
  categoryId?: number;
}
