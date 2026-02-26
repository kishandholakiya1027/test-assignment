'use client';
import Link from 'next/link';
import { Photo } from '@/types/api';
import { motion } from 'framer-motion';
import { ImageIcon, Eye } from 'lucide-react';

const FALLBACK = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f1f5f9'/%3E%3Crect x='140' y='140' width='120' height='120' rx='12' fill='%23e2e8f0'/%3E%3Ccircle cx='170' cy='175' r='15' fill='%23cbd5e1'/%3E%3Cpolygon points='140,260 185,210 215,240 245,205 260,260' fill='%23cbd5e1'/%3E%3C/svg%3E`;

interface PhotoCardProps {
    photo: Photo;
}

export function PhotoCard({ photo }: PhotoCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group relative aspect-square rounded-md overflow-hidden card-elevated"
        >
            <Link href={`/albums/${photo.albumId}`} className="block w-full h-full">
                <img
                    src={FALLBACK || photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-sm shadow-xl translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-[10px] font-black text-rose-600 uppercase mb-1 flex items-center gap-1">
                            <ImageIcon className="w-2.5 h-2.5" /> Album #{photo.albumId}
                        </p>
                        <p className="text-[11px] font-bold text-foreground line-clamp-1 capitalize">{photo.title}</p>
                        <div className="mt-2 text-[9px] font-bold flex items-center justify-between text-muted-foreground uppercase">
                            <span>ID: {photo.id}</span>
                            <span className="flex items-center gap-1 text-rose-600"><Eye className="w-2.5 h-2.5" /> View Album</span>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}
