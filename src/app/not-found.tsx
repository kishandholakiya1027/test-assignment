'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Users,
    FileText,
    MessageSquare,
    Image as ImageIcon,
    CheckSquare,
    Layers,
    ArrowLeft,
    SearchX,
} from 'lucide-react';

const quickLinks = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { name: 'Users', href: '/users', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { name: 'Posts', href: '/posts', icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
    { name: 'Comments', href: '/comments', icon: MessageSquare, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { name: 'Albums', href: '/albums', icon: Layers, color: 'text-amber-600', bg: 'bg-amber-50' },
    { name: 'Photos', href: '/photos', icon: ImageIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
    { name: 'Todos', href: '/todos', icon: CheckSquare, color: 'text-teal-600', bg: 'bg-teal-50' },
];

export default function NotFound() {
    return (
        <div className="lg:min-h-[calc(100vh-64px)] min-h-[calc(100vh-40px)] w-full flex items-center justify-center bg-background">
            <div className="max-w-2xl w-full text-center space-y-10">

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 18 }}
                    className="relative flex items-center justify-center"
                >
                    <div className="absolute w-64 h-64 rounded-full bg-indigo-100 blur-3xl opacity-60" />

                    <div className="relative z-10 flex flex-col items-center gap-4">
                        <div className="w-24 h-24 rounded-md bg-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-200 rotate-6 hover:rotate-0 transition-transform duration-500">
                            <SearchX className="w-12 h-12 text-white" />
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                            className="text-6xl sm:text-[7rem] md:text-[9rem] font-black text-foreground leading-none tracking-tighter select-none"
                            style={{ WebkitTextStroke: '2px #e2e8f0', color: 'transparent' }}
                        >
                            404
                        </motion.p>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="space-y-3"
                >
                    <h1 className="text-2xl sm:text-3xl font-black text-foreground tracking-tight uppercase">
                        Page Not Found
                    </h1>
                    <p className="text-muted-foreground font-medium text-lg max-w-md mx-auto leading-relaxed">
                        The route you're looking for doesn't exist or may have been moved.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-sm font-bold text-sm uppercase tracking-widest shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-0.5 transition-all duration-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Dashboard
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="space-y-4 md:block hidden"
                >
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        Or jump to a section
                    </p>
                    <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-7 gap-3">
                        {quickLinks.map((link, i) => (
                            <motion.div
                                key={link.href}
                                initial={{ opacity: 0, scale: 0.85 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.04 }}
                            >
                                <Link
                                    href={link.href}
                                    className="flex flex-col items-center gap-2 p-3 rounded-sm card-elevated hover:border-indigo-200 group transition-all duration-200"
                                >
                                    <div className={`p-2 rounded-md ${link.bg} ${link.color} group-hover:scale-110 transition-transform`}>
                                        <link.icon className="w-4 h-4" />
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors">
                                        {link.name}
                                    </span>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
