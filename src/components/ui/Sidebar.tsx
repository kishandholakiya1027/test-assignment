'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    FileText,
    MessageSquare,
    Image as ImageIcon,
    CheckSquare,
    LayoutDashboard,
    Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const menuItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Posts', icon: FileText, href: '/posts' },
    { name: 'Comments', icon: MessageSquare, href: '/comments' },
    { name: 'Albums', icon: Layers, href: '/albums' },
    { name: 'Photos', icon: ImageIcon, href: '/photos' },
    { name: 'Todos', icon: CheckSquare, href: '/todos' },
];

export function Sidebar() {
    const pathname = usePathname();

    return (
        <div className="w-64 h-full sidebar-glass lg:flex hidden flex-col fixed left-0 top-0 z-50">
            <div className="p-6 flex items-center gap-3">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center shadow-lg shadow-primary/20">
                    <BarChart3 className="text-white w-6 h-6" />
                </div>
                <h1 className="text-xl font-bold text-foreground">
                    JSON Dash
                </h1>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2">
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link key={item.name} href={item.href}>
                            <div className={cn(
                                "group relative flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-300 overflow-hidden",
                                isActive ? "text-primary bg-primary/5" : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                            )}>
                                {isActive && (
                                    <motion.div
                                        layoutId="active-nav"
                                        className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <item.icon className={cn(
                                    "w-5 h-5 transition-colors",
                                    isActive ? "text-primary" : "group-hover:text-primary"
                                )} />
                                <span className="font-medium relative z-10">{item.name}</span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 mt-auto">
                <div className="p-4 rounded-md bg-secondary border border-border">
                    <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wider font-semibold">System</p>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-foreground">Live Feed</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
