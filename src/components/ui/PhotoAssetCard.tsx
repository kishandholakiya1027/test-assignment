'use client';
import { Photo } from '@/types/api';
import { Grid3X3 } from 'lucide-react';
import { motion } from 'framer-motion';

const FALLBACK = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23fffbeb'/%3E%3Crect x='140' y='140' width='120' height='120' rx='12' fill='%23fef3c7'/%3E%3Ccircle cx='170' cy='175' r='15' fill='%23fde68a'/%3E%3Cpolygon points='140,260 185,210 215,240 245,205 260,260' fill='%23fde68a'/%3E%3C/svg%3E`;

interface PhotoAssetCardProps {
    photo: Photo;
}

export function PhotoAssetCard({ photo }: PhotoAssetCardProps) {

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="group card-elevated rounded-md overflow-hidden bg-white hover:border-amber-300"
        >
            <div className="relative aspect-square overflow-hidden bg-slate-50">
                <img
                    src={FALLBACK || photo.url}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                />
                <div className="absolute inset-0 bg-linear-to-t from-white/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5">
                    <div className="bg-white/90 backdrop-blur-sm p-3 rounded-sm shadow-sm border border-white translate-y-2 group-hover:translate-y-0 transition-transform">
                        <p className="text-[11px] font-bold text-foreground line-clamp-2 leading-tight capitalize">{photo.title}</p>
                        <p className="text-[9px] font-black text-amber-600 mt-2 uppercase tracking-tighter">Asset #{photo.id}</p>
                    </div>
                </div>
            </div>
            <div className="p-4 flex items-center justify-center gap-2 text-muted-foreground border-t border-secondary/50">
                <Grid3X3 className="w-3.5 h-3.5 opacity-40 transition-transform group-hover:rotate-90 duration-500" />
                <span className="text-[10px] uppercase font-black tracking-widest">Metadata Locked</span>
            </div>
        </motion.div>
    );
}
