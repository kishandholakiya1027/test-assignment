
import React from 'react';

interface PageHeaderProps {
    title: string;
    description: string;
    actions?: React.ReactNode;
}

export function PageHeader({ title, description, actions }: PageHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{title}</h2>
                <p className="text-muted-foreground mt-1 text-sm sm:text-base md:text-lg font-medium">{description}</p>
            </div>
            {actions && <div className="flex items-center gap-3">{actions}</div>}
        </div>
    );
}
