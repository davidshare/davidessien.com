import Image from "next/image";
import { Cloud, Code2 } from "lucide-react";

const services = [
  {
    icon: <Cloud className="h-8 w-8" />,
    title: "Devops Engineering",
    description:
      "We conduct thorough evaluations of your competitors and target audience to uncover industry best practices.",
  },
  {
    icon: <Code2 className="h-8 w-8" />,
    title: "Software Development",
    description:
      "We conduct thorough evaluations of your competitors and target audience to uncover industry best practices",
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container px-4 md:px-8">
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="mb-2 text-sm font-medium text-muted-foreground">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              My Areas of Expertise
            </h2>
          </div>
          <p className="max-w-md text-muted-foreground">
            We conduct thorough evaluations of your competitors and target
            audience to uncover industry best practices
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 items-center">
          <div className="space-y-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-3xl border bg-card p-8 hover:shadow-lg transition-all duration-300"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {service.icon}
                </div>
                <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px]">
            <div className="absolute inset-0 rounded-3xl overflow-hidden bg-black">
              {/* Mockup of laptop */}
              <Image
                src="https://picsum.photos/800/600?grayscale"
                alt="Laptop showing code"
                fill
                className="object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
