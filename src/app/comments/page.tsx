import { api } from '@/lib/api';
import { CommentCard } from '@/components/ui/CommentCard';
import { PageHeader } from '@/components/ui/PageHeader';

export default async function CommentsPage() {
    const comments = await api.getComments();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Feedback"
                description="User feedback and interactions across all posts."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {comments.map((comment) => (
                    <CommentCard key={comment.id} comment={comment} />
                ))}
            </div>
        </div>
    );
}
