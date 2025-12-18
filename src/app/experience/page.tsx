import Link from "next/link";
import fs from "fs";
import path from "path";

interface ExperienceIndexItem {
  slug: string;  // e.g., "00-andela-software-developer"
  title: string;
  company: string;
  location?: string;
  description: string;
  duration: {
    label: string;
  };
}

async function getExperiences(): Promise<ExperienceIndexItem[]> {
  try {
    const indexPath = path.join(process.cwd(), 'public', 'experience-index.json');

    if (!fs.existsSync(indexPath)) {
      console.error('Index file not found:', indexPath);
      return [];
    }

    const fileContent = fs.readFileSync(indexPath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to load experience index:', error);
    return [];
  }
}

export default async function ExperiencePage() {
  const experiences = await getExperiences();

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <h1 className="text-4xl font-bold mb-12 text-center">My Experience</h1>

        <div className="flex flex-col gap-12">
          {experiences.map((item) => (
            <Link
              key={item.slug}
              href={`/experience/${item.slug}`}  // Use slug with number prefix
              className="block p-6 border rounded-3xl hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{item.title}</h2>
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                    <span className="font-medium text-primary">{item.company}</span>
                    {item.location && <span>• {item.location}</span>}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-3">
                    {item.description}
                  </p>
                </div>
                <div className="text-sm font-medium whitespace-nowrap bg-secondary/50 px-3 py 1 rounded-md h-fit">
                  {item.duration.label}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}