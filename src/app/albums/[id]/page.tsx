import Link from 'next/link';
import { api } from '@/lib/api';
import { Album, Photo, User as UserType } from '@/types/api';
import { PhotoAssetCard } from '@/components/ui/PhotoAssetCard';
import { ArrowLeft, User, Image as ImageIcon, ExternalLink } from 'lucide-react';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function AlbumDetailPage({ params }: PageProps) {
    const { id } = await params;
    const albumId = parseInt(id);

    const album = await api.getAlbum(albumId) as Album;
    const photos = await api.getPhotosByAlbum(albumId) as Photo[];
    const user = await api.getUser(album.userId) as UserType;

    if (!album) return <div className="p-8 text-center font-bold">Album not found</div>;

    return (
        <div className="space-y-10 pb-12 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <Link href="/albums" className="inline-flex items-center gap-2 text-sm font-bold text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft className="w-4 h-4" /> All Collections
                </Link>
                <Link href={`/users/${user.id}`} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white card-elevated text-sm font-bold text-foreground hover:text-primary transition-all">
                    <User className="w-4 h-4 text-primary" />
                    Created by {user.name}
                    <ExternalLink className="w-3 h-3 ml-1 opacity-40" />
                </Link>
            </div>

            <div className="space-y-2 border-l-4 border-amber-400 pl-8 py-2">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight uppercase">{album.title}</h1>
                <p className="text-muted-foreground font-bold flex items-center gap-2 uppercase tracking-widest text-xs">
                    <ImageIcon className="w-4 h-4 text-amber-500" />
                    {photos.length} High Resolution Images
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                {photos.map((photo) => (
                    <PhotoAssetCard key={photo.id} photo={photo} />
                ))}
            </div>
        </div>
    );
}
