import fs from "fs";
import path from "path";
import Image from 'next/image'
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
    <div className="mx-auto max-w-5xl py-16">
      <div className="mb-6">
        <Image
          src="/images/about-image.jpg"
          alt="David Essien"
          width={1200}
          height={630}
          priority
          className="rounded-3xl object-cover"
        />
      </div>
      <article
        className="prose prose-neutral dark:prose-invert prose-lg prose-h1:text-center prose-h4:text-center max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
