import certificationsData from "@/content/certifications.json";

interface CertificationItem {
  name: string;
  issuingOrganization: string;
  issueDate: string;
  expirationDate?: string;
  certificateId?: string;
  verificationUrl?: string;
  skills?: string[];
}

export const metadata = {
  title: "Certifications",
  description: "Professional certifications validating my technical expertise",
};

export default function CertificationsPage() {
  const { certifications } = certificationsData as {
    certifications: CertificationItem[];
  };

  return (
    <div className="min-h-screen bg-background py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Certifications</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Industry-recognized certifications that validate my hands-on
            experience with production systems and modern infrastructure.
          </p>
        </div>

        {/* Certifications List */}
        <div className="flex flex-col gap-12">
          {certifications.map((item, index) => (
            <div
              key={index}
              className="p-6 border rounded-3xl"
            >
              <div className="flex flex-col gap-4">
                {/* Title */}
                <div>
                  <h2 className="text-xl font-bold text-foreground">
                    {item.name}
                  </h2>

                  <p className="text-sm text-muted-foreground mt-1">
                    {item.issuingOrganization}
                  </p>
                </div>

                {/* Skills */}
                {item.skills && (
                  <div>
                    <p className="text-sm font-medium mb-2">
                      Skills covered
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill) => (
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

                {/* Dates */}
                <div className="flex flex-wrap gap-2">
                  <div className="text-sm font-medium bg-secondary/50 px-3 py-1 rounded-md w-fit">
                    Issued: {item.issueDate}
                  </div>

                  {item.expirationDate && (
                    <div className="text-sm font-medium bg-secondary/50 px-3 py-1 rounded-md w-fit">
                      Expires: {item.expirationDate}
                    </div>
                  )}
                </div>

                {/* Optional verification */}
                {item.verificationUrl && (
                  <a
                    href={item.verificationUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-foreground w-fit"
                  >
                    View certification →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
