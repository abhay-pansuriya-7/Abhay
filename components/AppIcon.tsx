import React from 'react';
import * as LucideIcons from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type LucideIconKeys = {
    [K in keyof typeof LucideIcons]: (typeof LucideIcons)[K] extends LucideIcon ? K : never
}[keyof typeof LucideIcons];

function Icon({
    name,
    size = 24,
    color = "currentColor",
    className = "",
    strokeWidth = 2,
    ...props
}: {
    name: LucideIconKeys;
    size?: number;
    color?: string;
    className?: string;
    strokeWidth?: number;
    [key: string]: any;
}) {
    const IconComponent = LucideIcons[name] as unknown as LucideIcon | undefined;

    if (!IconComponent) {
        return <HelpCircle size={size} color="gray" strokeWidth={strokeWidth} className={className} {...props} />;
    }

    return <IconComponent
        size={size}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...props}
    />;
}
export default Icon;