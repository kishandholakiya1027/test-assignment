'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2, Circle, ArrowRight } from 'lucide-react';
import { Todo } from '@/types/api';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface TodoCardProps {
    todo: Todo;
}

export function TodoCard({ todo }: TodoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={cn(
                "p-6 rounded-md card-elevated flex flex-col justify-between group",
                todo.completed ? "bg-emerald-50/20! border-emerald-100" : "hover:border-blue-200"
            )}
        >
            <div className="flex items-start justify-between gap-4 mb-4">
                <div className={cn(
                    "p-3 rounded-md shrink-0 transition-colors",
                    todo.completed ? "bg-emerald-100 text-emerald-600" : "bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-500"
                )}>
                    {todo.completed ? <CheckCircle2 className="w-6 h-6" /> : <Circle className="w-6 h-6" />}
                </div>
                <span className={cn(
                    "text-[10px] px-2.5 py-1 rounded-full font-black uppercase tracking-wider",
                    todo.completed ? "bg-emerald-100 text-emerald-700" : "bg-blue-100 text-blue-700"
                )}>
                    {todo.completed ? 'Success' : 'Active'}
                </span>
            </div>

            <p className={cn(
                "text-lg font-bold leading-tight mb-6 capitalize",
                todo.completed ? "text-muted-foreground line-through opacity-60" : "text-foreground"
            )}>
                {todo.title}
            </p>

            <Link
                href={`/users/${todo.userId}`}
                className="mt-auto flex items-center justify-between p-3 rounded-md bg-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300"
            >
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-white/50 text-[10px] flex items-center justify-center font-black">
                        {todo.userId}
                    </div>
                    <span className="text-xs font-bold uppercase overflow-hidden text-ellipsis whitespace-nowrap">Assignee Profile</span>
                </div>
                <ArrowRight className="w-3.5 h-3.5" />
            </Link>
        </motion.div>
    );
}
