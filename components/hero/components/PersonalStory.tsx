import React from 'react';
import Icon from '@/components/AppIcon';

const PersonalStory = () => {
  const storyMilestones: Array<{
    year: string;
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Icon>["name"];
  }> = [
    {
      year: "2019",
      title: "The Beginning",
      description: "Started my journey with HTML, CSS, and JavaScript while working as a Shopify developer.",
      icon: "Rocket"
    },
    {
      year: "2020",
      title: "Shopify Developer",
      description: "Fell in love with Shopify development and jQuery and started learning backend development with Laravel.",
      icon: "Heart"
    },
    
    {
      year: "2022",
      title: "MERN Stack Developer",
      description: "Started learning React and started working as a MERN Stack developer. get my hands dirty with MongoDB, Express.js, React, and Node.js.",
      icon: "Code"
    },
    {
      year: "2025",
      title: "Sr. Full Stack Developer (Generative AI & LLMs)",
      description: "Currently working as a Sr. Full Stack Developer . I'm responsible for the full stack development of the company's projects. get my hands dirty with generative AI and LLMs.",
      icon: "Sparkles"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            My Journey in Code
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            Every developer has a story. Mine is about curiosity, continuous learning, 
            and the belief that technology should make life better for everyone.
          </p>
        </div>

        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary to-accent rounded-full hidden lg:block"></div>

          <div className="space-y-12 lg:space-y-16">
            {storyMilestones?.map((milestone, index) => (
              <div
                key={milestone?.year}
                className={`flex flex-col lg:flex-row items-center gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Content Card */}
                <div className="flex-1 lg:max-w-md">
                  <div className="bg-card border border-border rounded-2xl p-8 shadow-soft hover:shadow-elevation transition-all duration-300 group">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon name={milestone?.icon} size={24} color="white" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-primary">{milestone?.year}</div>
                        <div className="text-lg font-semibold text-foreground">{milestone?.title}</div>
                      </div>
                    </div>
                    <p className="text-text-secondary leading-relaxed">
                      {milestone?.description}
                    </p>
                  </div>
                </div>

                {/* Timeline Node */}
                <div className="hidden lg:flex w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full border-4 border-background shadow-soft z-10"></div>

                {/* Spacer for alternating layout */}
                <div className="flex-1 lg:max-w-md hidden lg:block"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="mt-20 lg:mt-32">
          <div className="bg-gradient-to-br from-muted to-surface rounded-3xl p-8 lg:p-12 border border-border">
            <div className="text-center mb-8">
              <Icon name="Quote" size={48} className="text-primary mx-auto mb-4" />
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                My Development Philosophy
              </h3>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} color="white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">User-Centric</h4>
                <p className="text-text-secondary">
                  Every line of code should serve the end user. I prioritize accessibility, 
                  performance, and intuitive design in everything I build.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Zap" size={32} color="white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Performance First</h4>
                <p className="text-text-secondary">
                  Clean, efficient code that scales. I believe in writing code that not only 
                  works today but remains maintainable tomorrow.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Lightbulb" size={32} color="white" />
                </div>
                <h4 className="text-lg font-semibold text-foreground mb-2">Continuous Learning</h4>
                <p className="text-text-secondary">
                  Technology evolves rapidly. I stay curious, embrace new challenges, 
                  and never stop learning from the community.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PersonalStory;