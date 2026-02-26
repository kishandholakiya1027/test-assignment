'use client';

import React from 'react';
import Link from 'next/link';
import { UserCircle, Mail, Globe, MapPin } from 'lucide-react';
import { User } from '@/types/api';
import { ResourceCard } from './ResourceCard';

interface UserCardProps {
    user: User;
}

export function UserCard({ user }: UserCardProps) {
    return (
        <Link href={`/users/${user.id}`} className="block h-full group">
            <ResourceCard
                title={user.name}
                description={`@${user.username}`}
                className="flex flex-col h-full hover:border-indigo-200"
                icon={<UserCircle className="w-5 h-5 text-indigo-600" />}
            >
                <div className="mt-4 space-y-3 flex-1">
                    <div className="flex items-center gap-3 text-sm">
                        <div className="p-1.5 rounded-md bg-secondary text-muted-foreground group-hover:text-indigo-600 transition-colors">
                            <Mail className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-foreground/80 truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                        <div className="p-1.5 rounded-md bg-secondary text-muted-foreground group-hover:text-indigo-600 transition-colors">
                            <Globe className="w-4 h-4" />
                        </div>
                        <span className="text-blue-600 hover:underline">{user.website}</span>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                        <div className="p-1.5 rounded-md bg-secondary text-muted-foreground group-hover:text-indigo-600 transition-colors">
                            <MapPin className="w-4 h-4" />
                        </div>
                        <span className="text-muted-foreground">{user.address.city}</span>
                    </div>
                </div>

                <div className="mt-6 w-full py-2.5 bg-indigo-50 group-hover:bg-indigo-600 text-indigo-600 group-hover:text-white rounded-md font-bold transition-all duration-300 text-center text-sm shadow-sm group-hover:shadow-indigo-200">
                    View Profile
                </div>
            </ResourceCard>
        </Link>
    );
}
