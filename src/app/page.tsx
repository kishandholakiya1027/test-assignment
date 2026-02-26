import { api } from '@/lib/api';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { PageHeader } from '@/components/ui/PageHeader';
import {
  Users,
  FileText,
  MessageSquare,
  Image as ImageIcon,
  CheckSquare,
  Layers,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

export default async function Dashboard() {
  const [users, posts, comments, albums, photos, todos] = await Promise.all([
    api.getUsers(),
    api.getPosts(),
    api.getComments(),
    api.getAlbums(),
    api.getPhotos(),
    api.getTodos(),
  ]);

  const stats = [
    { name: 'Users', value: users.length, icon: Users, color: 'text-indigo-600', link: '/users' },
    { name: 'Posts', value: posts.length, icon: FileText, color: 'text-blue-600', link: '/posts' },
    { name: 'Comments', value: comments.length, icon: MessageSquare, color: 'text-emerald-600', link: '/comments' },
    { name: 'Albums', value: albums.length, icon: Layers, color: 'text-amber-600', link: '/albums' },
    { name: 'Photos', value: photos.length, icon: ImageIcon, color: 'text-rose-600', link: '/photos' },
    { name: 'Todos', value: todos.length, icon: CheckSquare, color: 'text-teal-600', link: '/todos' },
  ];

  return (
    <div className="space-y-10 w-full">
      <PageHeader
        title="Welcome to JSON Dash"
        description="A lightweight view into the community dataset."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 sm:gap-5 md:gap-6">
        {stats.map((stat) => (
          <Link key={stat.name} href={stat.link} className="group h-full">
            <ResourceCard
              title={stat.name}
              className="h-full"
              icon={<stat.icon className={stat.color} />}
            >
              <div className="flex items-end justify-between">
                <div className="text-4xl font-extrabold text-foreground">
                  {stat.value}
                </div>
                <div className="p-2 rounded-full bg-secondary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </ResourceCard>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <ResourceCard title="Latest Articles" description="Recently published by our community">
          <div className="space-y-3 mt-4">
            {posts.slice(0, 5).map((post) => (
              <Link key={post.id} href={`/posts/${post.id}`}>
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary transition-colors border border-transparent hover:border-border">
                  <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold text-xs">
                    {post.id}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate capitalize">{post.title}</p>
                    <p className="text-xs text-muted-foreground italic">Posted by User {post.userId}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ResourceCard>

        <ResourceCard title="Verified Users" description="Members of the community network">
          <div className="space-y-3 mt-4">
            {users.slice(0, 5).map((user) => (
              <Link key={user.id} href={`/users/${user.id}`}>
                <div className="flex items-center gap-4 p-3 rounded-md hover:bg-secondary transition-colors border border-transparent hover:border-border">
                  <div className="w-8 h-8 rounded-md bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground truncate capitalize">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </ResourceCard>
      </div>
    </div>
  );
}
