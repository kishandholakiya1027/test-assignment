'use client';
import { Mail } from 'lucide-react';
import { Comment } from '@/types/api';
import { motion } from 'framer-motion';

interface PostCommentCardProps {
    comment: Comment;
}

export function PostCommentCard({ comment }: PostCommentCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="card-elevated p-4 sm:p-6 md:p-8 rounded-md bg-secondary/20 border-transparent hover:border-emerald-200 transition-all duration-300 overflow-hidden"
        >
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white flex items-center justify-center text-emerald-600 font-black shadow-sm border border-emerald-50/50 group-hover:bg-emerald-50 transition-colors shrink-0">
                    {comment.name[0].toUpperCase()}
                </div>
                <div className="flex-1 overflow-hidden min-w-0">
                    <h4 className="font-black text-foreground capitalize tracking-tight truncate text-sm sm:text-base">{comment.name}</h4>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-600/70">
                        <Mail className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">{comment.email}</span>
                    </div>
                </div>
            </div>
            <p className="text-foreground/80 font-medium leading-relaxed bg-white/50 p-3 sm:p-4 rounded-md border border-white/80 italic text-sm sm:text-base wrap-break-word">
                "{comment.body}"
            </p>
        </motion.div>
    );
}
