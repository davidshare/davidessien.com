import {z} from "zod";

export const BlogPostSchema = z.object({
  slug: z.string(),
  title: z.string().min(1),
  date: z
    .union([z.string(), z.date()])
    .transform((value) =>
      value instanceof Date ? value.toISOString().split("T")[0] : value
    ),
  primaryCategory: z.string(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  excerpt: z.string(),
  coverImage: z.string(),
  status: z.enum(["draft", "published"]).default("published"),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;
