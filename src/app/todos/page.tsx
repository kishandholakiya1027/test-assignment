import { api } from '@/lib/api';
import { PageHeader } from '@/components/ui/PageHeader';
import { TodoCard } from '@/components/ui/TodoCard';

export default async function TodosPage() {
    const todos = await api.getTodos();

    return (
        <div className="space-y-10 w-full">
            <PageHeader
                title="Checklist"
                description="Global status of ongoing community tasks."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {todos.map((todo) => (
                    <TodoCard key={todo.id} todo={todo} />
                ))}
            </div>
        </div>
    );
}
