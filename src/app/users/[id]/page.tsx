import Link from 'next/link';
import { api } from '@/lib/api';
import { cn } from '@/lib/utils';
import { ResourceCard } from '@/components/ui/ResourceCard';
import { User, Post, Todo, Album } from '../../../types/api';
import { MapPin, Phone, Globe, Mail, Building2, FileText, CheckSquare, Layers, ArrowLeft } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function UserDetailPage({ params }: PageProps) {
    const { id } = await params;
    const userId = parseInt(id);

    const [user, posts, todos, albums] = await Promise.all([
        api.getUser(userId) as Promise<User>,
        api.getPostsByUser(userId) as Promise<Post[]>,
        api.getTodosByUser(userId) as Promise<Todo[]>,
        api.getAlbumsByUser(userId) as Promise<Album[]>,
    ]);

    if (!user) return <div className="p-8 text-center font-bold">User not found</div>;

    return (
        <div className="space-y-8 xl:pb-12 w-full">
            <Link href="/users" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft className="w-4 h-4" /> Back to Directory
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                <div className="lg:col-span-1 space-y-6">
                    <div className="card-elevated p-8 rounded-md text-center bg-linear-to-b from-white to-secondary/20">
                        <div className="w-24 h-24 mx-auto rounded-md bg-indigo-600 flex items-center justify-center text-white text-3xl font-black shadow-xl shadow-indigo-200 mb-6 rotate-3 hover:rotate-0 transition-transform duration-500">
                            {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <h2 className="text-2xl font-black text-foreground uppercase tracking-tight">{user.name}</h2>
                        <p className="text-indigo-600 font-bold mb-8">@{user.username}</p>

                        <div className="space-y-4 text-left border-t border-border pt-6">
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <div className="p-2 rounded-md bg-secondary text-muted-foreground">
                                    <Mail className="w-4 h-4" />
                                </div>
                                <span>{user.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <div className="p-2 rounded-md bg-secondary text-muted-foreground">
                                    <Phone className="w-4 h-4" />
                                </div>
                                <span>{user.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium">
                                <div className="p-2 rounded-md bg-secondary text-muted-foreground">
                                    <Globe className="w-4 h-4" />
                                </div>
                                <a href={`https://${user.website}`} target="_blank" className="text-blue-600 hover:underline">{user.website}</a>
                            </div>
                        </div>
                    </div>

                    <ResourceCard title="Organization" icon={<Building2 className="w-5 h-5 text-indigo-600" />}>
                        <p className="text-foreground font-black text-lg">{user.company.name}</p>
                        <p className="text-sm font-medium text-muted-foreground italic mt-1 leading-relaxed">"{user.company.catchPhrase}"</p>
                    </ResourceCard>

                    <ResourceCard title="Location" icon={<MapPin className="w-5 h-5 text-indigo-600" />}>
                        <div className="space-y-1">
                            <p className="text-sm font-bold text-foreground">{user.address.street}, {user.address.suite}</p>
                            <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{user.address.city}, {user.address.zipcode}</p>
                        </div>
                    </ResourceCard>
                </div>

                <div className="lg:col-span-2 space-y-10">
                    {/* Posts Section */}
                    <section>
                        <h3 className="text-xl font-black text-foreground flex items-center gap-3 mb-6 uppercase tracking-wider">
                            <div className="w-8 h-8 rounded-md bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                <FileText className="w-4 h-4" />
                            </div>
                            Published Articles
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {posts.map((post: Post) => (
                                <Link key={post.id} href={`/posts/${post.id}`}>
                                    <div className="card-elevated p-5 rounded-md hover:border-indigo-300 group h-full flex flex-col">
                                        <h4 className="font-bold text-foreground group-hover:text-indigo-600 transition-colors line-clamp-1 mb-2 capitalize">
                                            {post.title}
                                        </h4>
                                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed flex-1 italic">
                                            {post.body}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    <section>
                        <h3 className="text-xl font-black text-foreground flex items-center gap-3 mb-6 uppercase tracking-wider">
                            <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-600 flex items-center justify-center">
                                <Layers className="w-4 h-4" />
                            </div>
                            Photo Collections
                        </h3>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {albums.map((album: Album) => (
                                <Link key={album.id} href={`/albums/${album.id}`}>
                                    <div className="card-elevated p-4 rounded-md text-center bg-amber-50/20 border-amber-100 hover:bg-amber-50 hover:border-amber-300 transition-all h-full flex flex-col justify-center">
                                        <p className="text-sm font-bold text-foreground line-clamp-2 capitalize">{album.title}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                    {/* Todos Section */}
                    <section>
                        <h3 className="text-xl font-black text-foreground flex items-center gap-3 mb-6 uppercase tracking-wider">
                            <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                <CheckSquare className="w-4 h-4" />
                            </div>
                            Tasks Overview
                        </h3>
                        <div className="card-elevated rounded-md divide-y divide-border overflow-hidden">
                            {todos.map((todo: Todo) => (
                                <div key={todo.id} className="p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors">
                                    <div className={cn(
                                        "w-3 h-3 rounded-full shrink-0 shadow-sm",
                                        todo.completed ? "bg-emerald-500 shadow-emerald-200" : "bg-slate-200"
                                    )} />
                                    <span className={cn(
                                        "text-sm font-medium capitalize",
                                        todo.completed ? "text-muted-foreground line-through italic" : "text-foreground"
                                    )}>{todo.title}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}
