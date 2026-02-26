'use client';
import { useState, useEffect, useRef, useCallback } from 'react';
import { Photo } from '@/types/api';
import { PhotoCard } from './PhotoCard';
import { Loader2, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PAGE_SIZE = 100;

interface PhotoGridProps {
    photos: Photo[];
}

export function PhotoGrid({ photos }: PhotoGridProps) {
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
    const [isLoading, setIsLoading] = useState(false);
    const sentinelRef = useRef<HTMLDivElement>(null);

    const displayedPhotos = photos.slice(0, visibleCount);
    const hasMore = visibleCount < photos.length;
    const totalLoaded = displayedPhotos.length;
    const totalPhotos = photos.length;

    const loadMore = useCallback(() => {
        if (isLoading || !hasMore) return;
        setIsLoading(true);

        // Small delay for smooth UX
        setTimeout(() => {
            setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, photos.length));
            setIsLoading(false);
        }, 400);
    }, [isLoading, hasMore, photos.length]);

    useEffect(() => {
        const sentinel = sentinelRef.current;
        if (!sentinel) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && hasMore && !isLoading) {
                    loadMore();
                }
            },
            { rootMargin: '400px' }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, isLoading, loadMore]);

    return (
        <div className="space-y-6">
            {/* Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                <AnimatePresence mode="popLayout">
                    {displayedPhotos.map((photo) => (
                        <PhotoCard key={photo.id} photo={photo} />
                    ))}
                </AnimatePresence>
            </div>

            {/* Sentinel + Loading indicator */}
            <div ref={sentinelRef} className="w-full flex flex-col items-center justify-center py-8 gap-4">
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-card border border-border shadow-lg"
                    >
                        <Loader2 className="w-4 h-4 animate-spin text-primary" />
                        <span className="text-sm font-bold text-muted-foreground">Loading more photos...</span>
                    </motion.div>
                )}

                {!hasMore && totalLoaded > 0 && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-secondary border border-border"
                    >
                        <ImageIcon className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest">
                            All {totalPhotos} photos loaded
                        </span>
                    </motion.div>
                )}
            </div>

            {/* Progress bar */}
            {hasMore && (
                <div className="w-full max-w-xs mx-auto space-y-2">
                    <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-primary/60 rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${(totalLoaded / totalPhotos) * 100}%` }}
                            transition={{ duration: 0.5, ease: 'easeOut' }}
                        />
                    </div>
                    <p className="text-center text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                        {totalLoaded} / {totalPhotos} photos
                    </p>
                </div>
            )}
        </div>
    );
}
