import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: z.object({
    id: z.string().optional(),
    title: z.string(),
    description: z.string(),
    pubDate: z
      .string()
      .or(z.date())
      .transform((val) => new Date(val)),
    updatedDate: z
      .string()
      .optional()
      .transform((str) => (str ? new Date(str) : undefined)),
    tags: z.array(z.string()).optional(),
    draft: z.boolean().optional(),
    headings: z
      .array(
        z.object({
          depth: z.number(),
          slug: z.string(),
          text: z.string(),
        }),
      )
      .optional(),
    minutesRead: z.string().optional(),
    words: z.number().optional(),
    heroImage: z.string().optional(),
  }),
});

export const collections = { blog };
