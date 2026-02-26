'use client';
import { Mail, MessageCircle } from 'lucide-react';
import { Comment } from '@/types/api';
import { ResourceCard } from './ResourceCard';

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps) {
    return (
        <ResourceCard
            title={comment.name.length > 30 ? comment.name.substring(0, 30) + '...' : comment.name}
            className="flex flex-col h-full hover:border-emerald-100"
            icon={<MessageCircle className="w-5 h-5 text-emerald-500" />}
        >
            <div className="flex items-center gap-2 mb-4">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                    <Mail className="w-3 h-3 text-emerald-500" />
                </div>
                <span className="text-xs font-medium text-muted-foreground truncate">{comment.email}</span>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground italic flex-1">
                "{comment.body}"
            </p>

            <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                <span className="text-[10px] text-muted-foreground">Post ID: {comment.postId}</span>
            </div>
        </ResourceCard>
    );
}
