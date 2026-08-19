import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import type { TableNode } from "#astro/components/recipe/utils";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
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

// Recursive recipe tree — leaves are ingredients ("250 g flour"),
// nodes are actions combining everything beneath them.
const tableNode: z.ZodType<TableNode> = z.lazy(() =>
  z.union([
    z.string(),
    z.object({ action: z.string(), from: z.array(tableNode).min(1) }),
  ]),
);

const recipes = defineCollection({
  // Files starting with "_" (e.g. _template.md) are not part of the collection
  loader: glob({
    base: "./src/content/recipes",
    pattern: ["**/*.{md,mdx}", "!**/_*"],
  }),
  schema: z
    .object({
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
      servings: z.number().min(1),
      yields: z.string().optional(),
      time: z
        .object({
          prep: z.number().optional(),
          cook: z.number().optional(),
          rest: z.number().optional(),
          total: z.number().optional(),
        })
        .optional(),
      // Standalone prep steps ("Preheat oven to 230 °C") shown as
      // full-width rows at the top of the table
      prep: z.array(z.string()).optional(),
      table: z
        .object({ action: z.string(), from: z.array(tableNode).min(1) })
        .optional(),
      // Flat list, only needed when there is no `table` (ingredients are
      // derived from the table's leaves otherwise)
      ingredients: z.array(z.string()).optional(),
      method: z.array(z.string()).min(1),
      notes: z.array(z.string()).optional(),
      sources: z
        .array(
          z.union([
            z.string(),
            z.object({ title: z.string(), url: z.string() }),
          ]),
        )
        .optional(),
      // Overrides / additions to the auto-detection
      diet: z.enum(["vegan", "vegetarian", "pescatarian"]).optional(),
      allergens: z.array(z.string()).optional(),
      heroImage: z.string().optional(),
    })
    .refine((data) => data.table || data.ingredients, {
      message: "A recipe needs a `table` tree or a flat `ingredients` list",
    }),
});

export const collections = { blog, recipes };
