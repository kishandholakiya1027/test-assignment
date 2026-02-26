'use client';

import React from 'react';
import Link from 'next/link';
import { Layers, User, ArrowRight } from 'lucide-react';
import { Album } from '@/types/api';
import { ResourceCard } from './ResourceCard';

interface AlbumCardProps {
    album: Album;
}

export function AlbumCard({ album }: AlbumCardProps) {
    return (
        <Link href={`/albums/${album.id}`} className="block h-full group">
            <ResourceCard
                title={album.title}
                className="flex flex-col h-full hover:border-amber-200 border-amber-50"
                icon={<Layers className="w-5 h-5 text-amber-600" />}
            >
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-md bg-amber-50 text-amber-600">
                            <User className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Creator #{album.userId}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-amber-600 group-hover:translate-x-1 transition-all" />
                </div>
            </ResourceCard>
        </Link>
    );
}
