import { api } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { PhotoGrid } from '@/components/ui/PhotoGrid';

export default async function PhotosPage() {
    const photos = await api.getPhotos();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Gallery"
                description={`Visual stories captured by the community — ${photos.length} photos.`}
            />

            <PhotoGrid photos={photos} />
        </div>
    );
}
