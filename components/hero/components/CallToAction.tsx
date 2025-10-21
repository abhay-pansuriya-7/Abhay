import React from 'react';

import Icon from '@/components/AppIcon';
import Button from '@/components/ui/button';
import Link from 'next/link';

const CallToAction = () => {
  const contactMethods: Array<{
    title: string;
    description: string;
    icon: React.ComponentProps<typeof Icon>['name'];
    action: string;
    link: string;
    variant: "default" | "outline" | "link" | "destructive" | "secondary" | "ghost" | "success" | "warning" | "danger";
  }> = [
    {
      title: "Let\'s Discuss Your Project",
      description: "Ready to bring your ideas to life? I'd love to hear about your project and explore how we can work together.",
      icon: "MessageCircle",
      action: "Start Conversation",
      link: "/contact",
      variant: "default"
    },
    {
      title: "Explore My Work",
      description: "Check out my portfolio to see examples of my development work and the technologies I specialize in.",
      icon: "Eye",
      action: "View Portfolio",
      link: "/skills",
      variant: "outline"
    },
    {
      title: "Learn About Services",
      description: "Discover the range of development services I offer and how I can help solve your technical challenges.",
      icon: "Briefcase",
      action: "View Services",
      link: "/services",
      variant: "outline"
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-text-secondary max-w-3xl mx-auto">
            I'm always excited to take on new challenges and collaborate with passionate teams. Let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {contactMethods?.map((method, index) => (
            <div
              key={method?.title}
              className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-elevation transition-all duration-300 group"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <Icon name={method?.icon} size={32} color="white" />
              </div>
              
              <h3 className="text-xl font-bold text-foreground mb-4">{method?.title}</h3>
              <p className="text-text-secondary mb-6 leading-relaxed">{method?.description}</p>
              
              <Link href={method?.link}>
                <Button
                  variant={method?.variant}
                  className={`w-full ${
                    method?.variant === 'default' ?'bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90' :'border-border hover:border-primary hover:text-primary'
                  }`}
                >
                  {method?.action}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        {/* Quick Contact Info */}
        <div className="bg-card border border-border rounded-2xl p-8 lg:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Let's Connect Directly
              </h3>
              <p className="text-text-secondary mb-6">
                Prefer a more direct approach? Feel free to reach out through any of these channels. 
                I typically respond within 24 hours.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Mail" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">abhay.main.email@gmail.com</div>
                    <div className="text-sm text-text-secondary">Email me directly</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Phone" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">+91 76985 76889</div>
                    <div className="text-sm text-text-secondary">Available Mon-Fri, 9AM-6PM IST</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="font-medium text-foreground">Gujarat, IN</div>
                    <div className="text-sm text-text-secondary">Open to remote opportunities</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <div className="inline-flex flex-col space-y-4">
                <Button
                  variant="default"
                  size="lg"
                  className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-soft"
                  iconName="Calendar"
                  iconPosition="left"
                >
                  Schedule a Call
                </Button>
                
                <div className="flex justify-center md:justify-end space-x-4">
                  <a
                    href="https://www.linkedin.com/in/abhay-pansuriya-7815701ab/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Icon name="Linkedin" size={20} />
                  </a>
                  <a
                    href="https://github.com/abhay-pansuriya-7"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Icon name="Github" size={20} />
                  </a>
                  <a
                    href="https://x.com/Abhay_D_P"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-primary/10 hover:bg-primary hover:text-white rounded-lg flex items-center justify-center transition-all duration-300"
                  >
                    <Icon name="Twitter" size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;