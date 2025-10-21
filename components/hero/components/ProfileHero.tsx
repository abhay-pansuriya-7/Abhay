import React from 'react';
import Button from '@/components/ui/button';
import Image from 'next/image';
import { Sparkles } from 'lucide-react';

const ProfileHero = () => {
    return (
        <div className="py-16">
            <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Profile Image Section */}
                    <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary to-accent rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                            <div className="relative">
                                <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-2xl overflow-hidden shadow-elevation bg-card border border-border">
                                    <Image
                                        src="/Images/Abhay.png"
                                        alt="Abhay"
                                        width={500}
                                        height={500}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                                </div>
                                {/* Status Indicator */}
                                <div className="absolute -bottom-2 -right-2 bg-accent text-success-foreground px-4 py-2 rounded-full text-sm font-medium shadow-soft flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
                                    <span>Available for work</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="order-1 lg:order-2 text-center lg:text-left">
                        <div className="inline-flex items-center px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
                            <Sparkles size={16} className="mr-2" />
                            Full Stack Developer
                        </div>

                        <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                            Hi, I'm{' '}
                            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                                Abhay Pansuriya
                            </span>
                        </h1>

                        <p className="text-xl text-text-secondary mb-8 leading-relaxed max-w-2xl">
                            With more than six years of experience in full-stack development, I specialize in creating high-quality, performance-driven web solutions.
                            My approach blends technical precision with creative problem-solving.
                            I aim to deliver products that are both innovative and reliable.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                            <Button
                                variant="default"
                                size="lg"
                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-soft"
                                iconName="MessageCircle"
                                iconPosition="left"
                            >

                                Let's Connect
                            </Button>
                            <Button
                                variant="outline"
                                size="lg"
                                className="border-border hover:border-primary hover:text-primary"
                                iconName="Download"
                                iconPosition="left"
                            >
                                Download Resume
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-foreground">6+</div>
                                <div className="text-sm text-text-secondary">Years Experience</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-foreground">13+</div>
                                <div className="text-sm text-text-secondary">Projects, I worked on</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-2xl font-bold text-foreground">98%</div>
                                <div className="text-sm text-text-secondary">Client Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);

};

export default ProfileHero;