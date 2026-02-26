'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    Image as ImageIcon,
    CheckSquare,
    Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const navItems = [
    { name: 'Home', icon: LayoutDashboard, href: '/' },
    { name: 'Users', icon: Users, href: '/users' },
    { name: 'Posts', icon: FileText, href: '/posts' },
    { name: 'Comments', icon: MessageSquare, href: '/comments' },
    { name: 'Albums', icon: Layers, href: '/albums' },
    { name: 'Todos', icon: CheckSquare, href: '/todos' },
];

export function BottomNav() {
    const pathname = usePathname();

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 sidebar-glass border-t border-border">
            <div className="flex items-stretch justify-around h-16 overflow-x-auto scrollbar-hide px-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="relative flex flex-col items-center justify-center gap-1 flex-1 min-w-[56px] py-2 group"
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="bottom-nav-indicator"
                                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-primary"
                                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                                />
                            )}
                            <item.icon
                                className={cn(
                                    'w-5 h-5 transition-all duration-200',
                                    isActive
                                        ? 'text-primary scale-110'
                                        : 'text-muted-foreground group-hover:text-foreground group-hover:scale-110'
                                )}
                            />
                            <span
                                className={cn(
                                    'text-[9px] font-black uppercase tracking-wider leading-none transition-colors',
                                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-foreground'
                                )}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}
