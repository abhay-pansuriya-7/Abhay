import React, { useEffect } from 'react';
// import { Helmet } from 'react-helmet';
import ProfileHero from './components/ProfileHero';
import PersonalStory from './components/PersonalStory';
import SkillsMatrix from './components/SkillsMatrix';
import PersonalInterests from './components/PersonalInterests';
import CallToAction from './components/CallToAction';

const About = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* <Helmet>
        <title>About Me - Alex Johnson | Full Stack Developer</title>
        <meta 
          name="description" 
          content="Learn about Alex Johnson, a passionate React developer with 5+ years of experience creating exceptional digital experiences. Discover my journey, skills, and philosophy." 
        />
        <meta name="keywords" content="React Developer, Full Stack Developer, JavaScript, TypeScript, Web Development, About Alex Johnson" />
        <meta property="og:title" content="About Me - Alex Johnson | Full Stack Developer" />
        <meta property="og:description" content="Passionate React developer transforming complex problems into elegant digital solutions. 5+ years experience, 50+ projects completed." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/about" />
      </Helmet> */}
    
      <main className="pt-16">
        {/* Hero Section with Profile */}
        <ProfileHero />
        
        {/* Personal Story & Journey */}
        <PersonalStory />
        
        {/* Skills Matrix & Certifications */}
        <SkillsMatrix />
        
        {/* Personal Interests & Values */}
        <PersonalInterests />
        
        {/* Call to Action */}
        <CallToAction />
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AJ</span>
              </div>
              <span className="text-lg font-bold text-foreground">Alex Johnson</span>
            </div>
            <p className="text-text-secondary mb-4">
              Building digital experiences that matter, one component at a time.
            </p>
            <p className="text-sm text-text-secondary">
              © {new Date()?.getFullYear()} Alex Johnson. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default About;