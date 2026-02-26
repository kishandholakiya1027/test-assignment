import { api } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { UserCard } from '@/components/ui/UserCard';

export default async function UsersPage() {
    const users = await api.getUsers();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Directory"
                description="Connect with members across the platform."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </div>
    );
}
