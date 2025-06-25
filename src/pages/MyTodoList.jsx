import React, { useEffect, useState, useMemo } from 'react';
import { TodoList } from '../components/TodoList';
import { showALLTodoFn } from '../service/operations/task';
import toast from 'react-hot-toast';

export const MyTodoList = () => {
  const [todos, setTodos] = useState([]);

  const statusGroups = ['To Do', 'In Progress', 'Done'];

  const groupByStatus = (tasks) => {
    const groups = Object.fromEntries(statusGroups.map(status => [status, []]));
    tasks.forEach((task) => {
      if (groups[task.status]) {
        groups[task.status].push(task);
      }
    });
    return groups;
  };

  const groupedTodos = useMemo(() => groupByStatus(todos), [todos]);

  const fetchAllTodo = async () => {
    try {
      const { data } = await showALLTodoFn();
      if (data.tasks && Array.isArray(data.tasks)) {
        setTodos(data.tasks);
        toast.success("Todos fetched successfully");
      } else {
        toast.error("No todos found.");
      }
    } catch (error) {
      toast.error("Failed to fetch todos. Please try again.");
    }
  };

  const handleDelete = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, status: newStatus } : todo
      )
    );
  };

  useEffect(() => {
    fetchAllTodo();
  }, []);

  return (
    <div className="max-w-7xl mx-auto mt-8 px-4">
      <div className="flex flex-col md:flex-row gap-6">
        {statusGroups.map((status) => (
          <div
            key={status}
            className="flex-1 bg-gray-100 p-4 rounded-lg shadow-md min-h-[300px]"
          >
            <h2 className="text-xl font-bold mb-4 text-center">{status}</h2>
            <div className="flex flex-col gap-4">
              {groupedTodos[status]?.length > 0 ? (
                groupedTodos[status].map((todo) => (
                  <TodoList
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    description={todo.description}
                    status={todo.status}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center">No tasks in this section.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
