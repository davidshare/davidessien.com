import educationData from "@/content/education.json";

interface EducationItem {
  degree?: string;
  program?: string;
  institution: string;
  location?: string;
  duration: string;
  degreeType: string;
  fieldOfStudy: string;
  description: string;
  relevantCourses?: string[];
  skillsAcquired?: string[];
}

export const metadata = {
  title: "Education",
  description: "Academic background and professional training",
};

export default function EducationPage() {
  const { education } = educationData as { education: EducationItem[] };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Education</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My academic foundation and formal training that support my work as a
            DevOps engineer and full-stack developer.
          </p>
        </div>

        {/* Education List */}
        <div className="flex flex-col gap-12">
          {education.map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-3xl"
            >
              <div className="flex flex-col gap-4">
                {/* Title */}
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {item.degree ?? item.program}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {item.institution}
                    {item.location ? ` • ${item.location}` : ""}
                  </p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground max-w-3xl">
                  {item.description}
                </p>

                {/* Courses / Skills */}
                {item.relevantCourses && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Relevant coursework
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.relevantCourses.map((course) => (
                        <span
                          key={course}
                          className="text-sm rounded-md bg-secondary px-3 py-1"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {item.skillsAcquired && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Skills acquired
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skillsAcquired.map((skill) => (
                        <span
                          key={skill}
                          className="text-sm rounded-md bg-secondary px-3 py-1"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Duration */}
                <div className="text-sm font-medium bg-secondary/50 px-3 py-1 rounded-md w-fit">
                  {item.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
