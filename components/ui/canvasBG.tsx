"use client";
import React, { useEffect, useState } from "react";
import clsx from "clsx";

interface Dot {
    id: number;
    x: number;
    y: number;
    size: number;
    duration: number;
}

const generateDots = (count: number): Dot[] => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        duration: Math.random() * 4 + 4, // 4s to 8s duration
    }));
};

const FloatingDotsBackground: React.FC = () => {
    const [dots, setDots] = useState<Dot[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setDots(generateDots(100));
    }, []);

    // Don't render anything on the server to avoid hydration mismatch
    if (!mounted) {
        return <div className="inset-0 overflow-hidden bg-background -z-10" />;
    }

    return (
        <div className="inset-0 overflow-hidden bg-background -z-10">
            {dots.map((dot) => (
                <div
                    key={dot.id}
                    className={clsx("absolute rounded-full bg-gray-500 opacity-70 transition-all duration-300")}
                    style={{
                        width: `${dot.size}px`,
                        height: `${dot.size}px`,
                        top: `${dot.y}%`,
                        left: `${dot.x}%`,
                        animation: `float ${dot.duration}s ease-in-out infinite alternate`,
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = "paused";
                        e.currentTarget.style.backgroundColor = "#9e6dfa";
                        e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.animationPlayState = "running";
                        e.currentTarget.style.backgroundColor = "#6b7280"; // Tailwind gray-500
                        e.currentTarget.style.opacity = "0.7";
                    }}
                />
            ))}

            <style jsx global>{`
                @keyframes float {
                    0% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(20px, -20px);
                    }
                    100% {
                        transform: translate(-20px, 20px);
                    }
                }
            `}</style>
        </div>
    );
};

export default FloatingDotsBackground;