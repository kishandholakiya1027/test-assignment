import Link from 'next/link';
import { api } from '@/lib/api';
import { MessageSquare, ArrowLeft, Clock } from 'lucide-react';
import { User as UserType, Post, Comment } from '@/types/api';
import { PostCommentCard } from '@/components/ui/PostCommentCard';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function PostDetailPage({ params }: PageProps) {
    const { id } = await params;
    const postId = parseInt(id);

    const post = await api.getPost(postId) as Post;
    const comments = await api.getCommentsByPost(postId) as Comment[];
    const user = await api.getUser(post.userId) as UserType;

    if (!post) return <div className="p-8 text-center font-bold">Post not found</div>;

    return (
        <div className="w-full space-y-6 sm:space-y-8 md:space-y-10 lg:pb-12 overflow-hidden">
            <Link href="/posts" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Feed
            </Link>

            <article className="card-elevated p-4 sm:p-6 md:p-8 lg:p-10 rounded-md bg-white overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-5 sm:mb-6 md:mb-8">
                    <Link href={`/users/${user.id}`} className="group flex items-center gap-3">
                        <div className="w-10 h-10 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
                            {user.name[0]}
                        </div>
                        <div>
                            <p className="text-sm font-black text-foreground group-hover:text-indigo-600 transition-colors uppercase tracking-tight">{user.name}</p>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none">Verified Author</p>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                        <Clock className="w-3.5 h-3.5" /> 5 Min Read
                    </div>
                </div>

                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-foreground mb-4 sm:mb-6 md:mb-8 leading-[1.15] tracking-tight capitalize wrap-break-word">{post.title}</h1>
                <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed italic border-l-4 border-indigo-100 pl-3 sm:pl-4 md:pl-6 py-2 mb-4 sm:mb-6 md:mb-8 wrap-break-word">
                    {post.body}
                </p>
                <div className="prose prose-slate max-w-none text-foreground font-medium leading-relaxed sm:leading-loose text-sm sm:text-base wrap-break-word">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </div>
            </article>

            <section className="space-y-4 sm:space-y-6 md:space-y-8">
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className="p-2.5 sm:p-3 rounded-md bg-emerald-50 text-emerald-600 shadow-sm shadow-emerald-100">
                        <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="text-lg sm:text-xl md:text-2xl font-black text-foreground uppercase tracking-tight">Discussion ({comments.length})</h3>
                </div>

                <div className="space-y-4 sm:space-y-6">
                    {comments.map((comment) => (
                        <PostCommentCard key={comment.id} comment={comment} />
                    ))}
                </div>
            </section>
        </div>
    );
}
