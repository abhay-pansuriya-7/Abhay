import React from 'react';
import Icon from '@/components/AppIcon';

const SkillsMatrix = () => {
  const skillCategories: Array<{
    title: string;
    icon: React.ComponentProps<typeof Icon>["name"];
    skills: Array<{ name: string; level: number; experience: string }>;
  }> = [
    {
      title: "Frontend Development",
      icon: "Monitor",
      skills: [
        { name: "React", level: 95, experience: "5+ years" },
        { name: "TypeScript", level: 90, experience: "3+ years" },
        { name: "Next.js", level: 88, experience: "2+ years" },
        { name: "Tailwind CSS", level: 92, experience: "3+ years" },
        { name: "JavaScript (ES6+)", level: 94, experience: "5+ years" }
      ]
    },
    {
      title: "Backend & Database",
      icon: "Server",
      skills: [
        { name: "Node.js", level: 85, experience: "3+ years" },
        { name: "Express.js", level: 82, experience: "3+ years" },
        { name: "MongoDB", level: 78, experience: "2+ years" },
        { name: "PostgreSQL", level: 75, experience: "2+ years" },
        { name: "REST APIs", level: 88, experience: "4+ years" }
      ]
    },
    {
      title: "Tools & DevOps",
      icon: "Settings",
      skills: [
        { name: "Git & GitHub", level: 92, experience: "5+ years" },
        { name: "Docker", level: 70, experience: "1+ years" },
        { name: "AWS", level: 68, experience: "1+ years" },
        { name: "Webpack/Vite", level: 80, experience: "2+ years" },
        { name: "Jest/Testing", level: 85, experience: "3+ years" }
      ]
    }
  ];

  const getSkillColor = (level:any) => {
    if (level >= 90) return "from-success to-emerald-400";
    if (level >= 80) return "from-primary to-blue-400";
    if (level >= 70) return "from-warning to-yellow-400";
    return "from-secondary to-gray-400";
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Technical Expertise
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            A comprehensive overview of my technical skills and proficiency levels, 
            built through years of hands-on experience and continuous learning.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {skillCategories?.map((category, categoryIndex) => (
            <div
              key={category?.title}
              className="bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elevation transition-all duration-300"
            >
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4">
                  <Icon name={category?.icon} size={24} color="white" />
                </div>
                <h3 className="text-xl font-bold text-foreground">{category?.title}</h3>
              </div>

              <div className="space-y-6">
                {category?.skills?.map((skill, skillIndex) => (
                  <div key={skill?.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-foreground">{skill?.name}</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-text-secondary">{skill?.experience}</span>
                        <span className="text-sm font-semibold text-primary">{skill?.level}%</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="w-full bg-border rounded-full h-2">
                        <div
                          className={`h-2 bg-gradient-to-r ${getSkillColor(skill?.level)} rounded-full transition-all duration-1000 ease-out group-hover:shadow-soft`}
                          style={{ 
                            width: `${skill?.level}%`,
                            animationDelay: `${categoryIndex * 200 + skillIndex * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="mt-16">
          <h3 className="text-2xl font-bold text-foreground text-center mb-8">
            Certifications & Achievements
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {([
              {
                title: "AWS Certified Developer",
                issuer: "Amazon Web Services",
                year: "2023",
                icon: "Award"
              },
              {
                title: "React Developer Certification",
                issuer: "Meta",
                year: "2022",
                icon: "Certificate"
              },
              {
                title: "JavaScript Algorithms",
                issuer: "freeCodeCamp",
                year: "2021",
                icon: "Code"
              },
              {
                title: "Agile Practitioner",
                issuer: "Scrum Alliance",
                year: "2023",
                icon: "Users"
              }
            ] as Array<{ title: string; issuer: string; year: string; icon: React.ComponentProps<typeof Icon>["name"] }> )?.map((cert, index) => (
              <div
                key={cert?.title}
                className="bg-card border border-border rounded-xl p-6 text-center hover:shadow-soft transition-all duration-300"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name={cert?.icon} size={24} color="white" />
                </div>
                <h4 className="font-semibold text-foreground mb-2">{cert?.title}</h4>
                <p className="text-sm text-text-secondary mb-1">{cert?.issuer}</p>
                <p className="text-xs text-primary font-medium">{cert?.year}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsMatrix;