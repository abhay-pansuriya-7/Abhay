import React from 'react';
import Icon from '@/components/AppIcon';
import Image from 'next/image';

const PersonalInterests = () => {
  const interests: Array<{
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Icon>["name"];
    image: string;
    imageAlt: string;
    stats: string;
  }> = [
  {
    title: "Open Source Contributions",
    description: "Contributing to React ecosystem projects and maintaining several npm packages used by thousands of developers worldwide.",
    icon: "GitBranch",
    image: "https://images.unsplash.com/photo-1635181951411-882166210167",
    imageAlt: "Multiple computer screens showing code repositories and open source project dashboards in modern development environment",
    stats: "15+ Projects"
  },
  {
    title: "Tech Mentoring",
    description: "Mentoring junior developers and conducting workshops on modern React patterns and best practices at local meetups.",
    icon: "Users",
    image: "https://images.unsplash.com/photo-1719978184147-c5bf6b82c6e1",
    imageAlt: "Group of diverse professionals collaborating around laptop in bright modern office space during mentoring session",
    stats: "50+ Mentees"
  },
  {
    title: "Photography",
    description: "Capturing moments through street and landscape photography. This hobby sharpens my eye for design and composition in UI/UX.",
    icon: "Camera",
    image: "https://images.unsplash.com/photo-1497217305029-066f2870276b",
    imageAlt: "Professional photographer with vintage camera capturing sunset landscape from mountain viewpoint",
    stats: "5K+ Shots"
  },
  {
    title: "Hiking & Nature",
    description: "Finding inspiration in nature\'s patterns and systems. Some of my best coding solutions come during mountain hikes.",
    icon: "Mountain",
    image: "https://images.unsplash.com/photo-1631119462484-6e9b42648510",
    imageAlt: "Hiker with backpack standing on rocky mountain peak overlooking vast green valley landscape at golden hour",
    stats: "100+ Trails"
  }];


  const values: Array<{
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Icon>["name"];
  }> = [
  {
    title: "Continuous Learning",
    description: "Technology evolves rapidly, and I believe in staying curious and adapting to new paradigms.",
    icon: "BookOpen"
  },
  {
    title: "Collaboration",
    description: "The best solutions emerge from diverse perspectives and open communication.",
    icon: "Users"
  },
  {
    title: "Quality Craftsmanship",
    description: "Every project deserves attention to detail and a commitment to excellence.",
    icon: "Award"
  },
  {
    title: "User Empathy",
    description: "Understanding user needs and pain points drives better design decisions.",
    icon: "Heart"
  }];


  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Personal Interests */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Beyond the Code
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              My interests outside of development shape my perspective and creativity, 
              bringing fresh insights to every project I work on.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {interests?.map((interest, index) =>
            <div
              key={interest?.title}
              className="group bg-card border border-border rounded-2xl overflow-hidden shadow-soft hover:shadow-elevation transition-all duration-300">

                <div className="relative h-48 overflow-hidden">
                  <Image
                  width={50}
                  height={50}
                  src={interest?.image}
                  alt={interest?.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 flex items-center space-x-2">
                    <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name={interest?.icon} size={16} color="white" />
                    </div>
                    <span className="text-white font-medium">{interest?.stats}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">{interest?.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{interest?.description}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Core Values */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Core Values
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto">
              The principles that guide my work and interactions, both in development and in life.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values?.map((value, index) =>
            <div
              key={value?.title}
              className="bg-gradient-to-br from-muted to-surface border border-border rounded-2xl p-6 text-center hover:shadow-soft transition-all duration-300 group">

                <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon name={value?.icon} size={32} color="white" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-3">{value?.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{value?.description}</p>
              </div>
            )}
          </div>
        </div>

        {/* Fun Facts */}
        <div className="mt-20">
          <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-8 lg:p-12 border border-primary/20">
            <h3 className="text-2xl font-bold text-foreground text-center mb-8">Fun Facts About Me</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-primary mb-2">☕</div>
                <div className="text-sm text-text-secondary">Coffee cups per day</div>
                <div className="text-lg font-semibold text-foreground">4-6</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">🌍</div>
                <div className="text-sm text-text-secondary">Countries visited</div>
                <div className="text-lg font-semibold text-foreground">12</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">📚</div>
                <div className="text-sm text-text-secondary">Tech books read this year</div>
                <div className="text-lg font-semibold text-foreground">8</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">🎵</div>
                <div className="text-sm text-text-secondary">Coding playlist songs</div>
                <div className="text-lg font-semibold text-foreground">247</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default PersonalInterests;