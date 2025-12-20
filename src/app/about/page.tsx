import fs from "fs";
import path from "path";
import { notFound } from "next/navigation";
import { renderMarkdown } from "@/lib/markdown"; // your helper

export const metadata = {
  title: "About – David Essien",
  description:
    "Cloud & DevOps Engineer focused on building reliable systems, helping teams move faster, and doing honest work.",
};

export default async function AboutPage() {
  const filePath = path.join(process.cwd(), "src/content/about.md");

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const content = fs.readFileSync(filePath, "utf8");
  const html = await renderMarkdown(content);

  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <article
        className="prose prose-neutral dark:prose-invert prose-lg"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}
