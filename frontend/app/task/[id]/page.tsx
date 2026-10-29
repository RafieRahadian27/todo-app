import { getTodoDetail } from '@/lib/todos';
import TaskDetailCard from './components/taskdetailcard';
import TaskNotFound from './components/tasknotfound';

type TaskDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function TaskDetailPage({
  params,
}: TaskDetailPageProps) {
  const { id } = await params;
  const todo = await getTodoDetail(id);

  if (!todo) {
    return <TaskNotFound id={id} />;
  }

  return <TaskDetailCard todo={todo} />;
}