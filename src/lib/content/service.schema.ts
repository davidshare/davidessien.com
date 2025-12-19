import {z} from "zod";

export const ServiceFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  serviceType: z.string(),
  image: z.string(),
  icon: z.string(),
  duration: z.string(),
  description: z.string(),
  primaryCategory: z.string(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  features: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
});

export type ServiceFrontmatter = z.infer<typeof ServiceFrontmatterSchema>;
