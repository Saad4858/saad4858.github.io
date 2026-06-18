import { skillCategories } from '@/data/skills';

export function Skills() {
  const visibleCategories = skillCategories.filter(
    (category) => category.skills.length > 0
  );

  return (
    <section id="skills" className="py-16 px-6 max-w-4xl mx-auto" aria-labelledby="skills-heading">
      <h2
        id="skills-heading"
        className="text-3xl font-bold font-heading text-primary mb-10"
      >
        Skills
      </h2>

      <div className="space-y-8">
        {visibleCategories.map((category) => (
          <div key={category.id}>
            <h3 className="text-lg font-semibold text-primary mb-3">
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="inline-block rounded-md border border-border bg-bg-alt px-3 py-1.5 text-sm text-text-muted"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
