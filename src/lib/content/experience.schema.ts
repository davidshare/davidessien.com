import {z} from "zod";

export const ExperienceFrontmatterSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  roleType: z
    .enum(["Full-time", "Part-time", "Contract", "Internship"])
    .default("Full-time"),
  remote: z.boolean().default(false),
  duration: z.object({
    start: z.string(),
    end: z.string().nullable(),
    label: z.string(),
  }),
  description: z.string(),
  tags: z.array(z.string()).default([]),
  techStack: z.array(z.string()).default([]),
});

export type ExperienceFrontmatter = z.infer<typeof ExperienceFrontmatterSchema>;
