'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ResourceCardProps {
    title: string;
    description?: string;
    children: React.ReactNode;
    className?: string;
    icon?: React.ReactNode;
}

export function ResourceCard({ title, description, children, className, icon }: ResourceCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("card-elevated rounded-md p-6", className)}
        >
            <div className="flex items-center gap-3 mb-4">
                {icon && (
                    <div className="p-2.5 rounded-md bg-primary/10 text-primary shadow-sm shadow-primary/5">
                        {icon}
                    </div>
                )}
                <div>
                    <h3 className="font-bold text-lg text-foreground line-clamp-1 capitalize">{title}</h3>
                    {description && <p className="text-sm text-muted-foreground font-medium">{description}</p>}
                </div>
            </div>
            <div className="text-foreground/80 leading-relaxed">
                {children}
            </div>
        </motion.div>
    );
}
