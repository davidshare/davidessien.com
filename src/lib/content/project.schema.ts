import {z} from "zod";

export const ProjectFrontmatterSchema = z.object({
  title: z.string(),
  projectType: z.string(),
  diagram: z.string().optional(),
  duration: z.string(),
  description: z.string(),
  primaryCategory: z.string(),
  categories: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
  repoUrl: z.string().url().optional(),
  demoUrl: z.string().url().optional(),
});

export type ProjectFrontmatter = z.infer<typeof ProjectFrontmatterSchema>;
