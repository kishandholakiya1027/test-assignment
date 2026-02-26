import { api } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { AlbumCard } from '@/components/ui/AlbumCard';

export default async function AlbumsPage() {
    const albums = await api.getAlbums();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Collections"
                description="Curated photo albums from our community members."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {albums.map((album) => (
                    <AlbumCard key={album.id} album={album} />
                ))}
            </div>
        </div>
    );
}
