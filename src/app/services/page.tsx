import { getAllServices } from "@/lib/services";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Services | David Essien",
  description: "Professional DevOps and SRE consulting services",
};

export default async function ServicesPage() {
  const services = await getAllServices();

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-extrabold mb-6">My Services</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Expert DevOps and SRE consulting tailored to accelerate your software delivery,
            improve reliability, and scale your infrastructure.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group block bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border"
            >
              <div className="relative aspect-[16/9] bg-muted">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl">{service.icon}</span>
                  <span className="text-sm font-medium text-primary uppercase tracking-wider">
                    {service.serviceType}
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-3">
                  {service.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1 bg-muted rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}