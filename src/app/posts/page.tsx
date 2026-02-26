import { api } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { PostCard } from '@/components/ui/PostCard';

export default async function PostsPage() {
    const posts = await api.getPosts();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Community Feed"
                description="Latest articles and thoughts from our members."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
                {posts.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
