import { z } from "zod";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "src/utils";

export const createImageSchema = z
  .object({
    productId: z.number({ required_error: "ProductId is required" }),
    name: z.string({ required_error: "Name is required" }),
    mainImage: z.boolean().optional(),
    file: z
      .any()
      .refine((image) => {
        return image.size <= MAX_FILE_SIZE;
      }, `Max image size is 3MB.`)
      .refine((image) => {
        return ACCEPTED_IMAGE_TYPES.includes(image?.mimetype);
      }, "Only .jpg, .jpeg, .png and .webp formats are supported."),
  })
  .required({ productId: true, name: true, mainImage: true, file: true });

export type CreateImageDto = z.infer<typeof createImageSchema>;
