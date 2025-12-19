import { getServiceBySlug, getAllServiceSlugs } from "@/lib/services";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = getAllServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-8">
          <Button variant="ghost" asChild className="gap-2">
            <Link href="/services">
              <ArrowLeft className="h-4 w-4" />
              Back to Services
            </Link>
          </Button>
        </div>
        {/* Hero */}
        <div className="relative aspect-[2/1] rounded-3xl overflow-hidden mb-12 shadow-2xl">
          <Image
            src={service.image}
            alt={service.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="absolute bottom-0 left-0 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              {/* <span className="text-5xl">{service.icon}</span> */}
              <span className="px-4 py-2 bg-primary/80 rounded-full text-sm font-medium">
                {service.serviceType}
              </span>
            </div>
            <h1 className="text-5xl font-extrabold mb-2">{service.title}</h1>
            <p className="text-xl opacity-90">{service.duration}</p>
          </div>
        </div>

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none prose-pre:p-0 prose-pre:m-0 prose-pre:bg-transparent"
          dangerouslySetInnerHTML={{ __html: service.html }}
        />

        {/* Features */}
        {service.features.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Key Features</h2>
            <ul className="grid gap-4 md:grid-cols-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary mt-1">✓</span>
                  <span className="text-lg">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Tech Stack */}
        {service.techStack.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8">Technology Stack</h2>
            <div className="flex flex-wrap gap-3">
              {service.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-muted rounded-lg text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}