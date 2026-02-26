'use client';

import React from 'react';
import Link from 'next/link';
import { User, Clock, ArrowRight } from 'lucide-react';
import { Post } from '@/types/api';
import { motion } from 'framer-motion';

interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -4 }}
            className="group"
        >
            <Link href={`/posts/${post.id}`} className="block h-full">
                <div className="flex flex-col md:flex-row h-full gap-6 p-6 rounded-md card-elevated hover:border-blue-300">
                    <div className="w-16 h-16 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl shrink-0">
                        {post.id}
                    </div>

                    <div className="flex-1 flex flex-col space-y-2">
                        <div className="flex items-center gap-3 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                            <span className="flex items-center gap-1"><User className="w-3 h-3" /> Author #{post.userId}</span>
                            <span className="w-1 h-1 rounded-full bg-border" />
                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 2m read</span>
                        </div>

                        <h3 className="text-xl font-extrabold text-foreground line-clamp-1 group-hover:text-blue-600 transition-colors capitalize">
                            {post.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 leading-relaxed text-sm flex-1">
                            {post.body}
                        </p>

                        <div className="pt-4 flex items-center gap-2 text-sm font-bold text-blue-600">
                            Keep Reading <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
