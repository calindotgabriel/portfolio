import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    tags: z.array(z.string()),
    author: z.string().default("Călin Gabriel"),
    image: z.string().optional(),
  }),
});

export const collections = { blog };
