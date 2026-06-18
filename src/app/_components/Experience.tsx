import { experience, education } from '@/data/experience';

export function Experience() {
  return (
    <section
      id="experience"
      className="py-16 px-6 max-w-4xl mx-auto"
      aria-labelledby="experience-heading"
    >
      <h2
        id="experience-heading"
        className="text-3xl font-bold text-primary mb-12"
      >
        Education &amp; Experience
      </h2>

      {/* Education Section */}
      <section aria-labelledby="education-heading" className="mb-12">
        <h3
          id="education-heading"
          className="text-xl font-semibold text-primary mb-6"
        >
          Education
        </h3>

        <div className="relative ml-4 pl-8 border-l-2 border-border">
          {education.map((entry) => (
            <div key={entry.id} className="relative mb-8 last:mb-0">
              <div
                className="absolute -left-[11px] top-[10px] h-[8px] w-[8px] rounded-full bg-primary"
                aria-hidden="true"
              />
              <h4 className="text-lg font-medium text-primary">
                {entry.degree}
              </h4>
              <p className="text-text-muted">{entry.institution}</p>
              <p className="text-sm text-text-muted mt-1">
                {entry.startDate} – {entry.endDate}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section aria-labelledby="work-experience-heading">
        <h3
          id="work-experience-heading"
          className="text-xl font-semibold text-primary mb-6"
        >
          Experience
        </h3>

        <div className="relative ml-4 pl-8 border-l-2 border-border">
          {experience.map((entry) => (
            <div key={entry.id} className="relative mb-8 last:mb-0">
              <div
                className="absolute -left-[11px] top-[10px] h-[8px] w-[8px] rounded-full bg-primary"
                aria-hidden="true"
              />
              <h4 className="text-lg font-medium text-primary">
                {entry.title}
              </h4>
              <p className="text-text-muted">{entry.organization}</p>
              {entry.details && entry.details.length > 0 && (
                <div className="relative mt-3 ml-5 pl-7 border-l-2 border-border">
                  {entry.details.map((detail) => (
                    <div key={detail.name} className="relative mb-4 last:mb-0">
                      <div
                        className="absolute -left-[9px] top-[7px] h-[6px] w-[6px] rounded-full bg-primary"
                        aria-hidden="true"
                      />
                      <p className="text-[15px] font-medium text-primary">{detail.name}</p>
                      <p className="text-sm text-text-muted">{detail.startDate} {detail.endDate}</p>
                    </div>
                  ))}
                </div>
              )}
              {!(entry.details && entry.details.length > 0) && (
                <p className="text-sm text-text-muted mt-2">
                  {entry.startDate} – {entry.endDate}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
