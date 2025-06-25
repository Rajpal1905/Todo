import React from 'react';
import { LuCircleDashed, LuCircleCheckBig } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { changeStatusTodoFn, deleteTodoFn } from '../service/operations/task';
import toast from 'react-hot-toast';

export const TodoList = ({ title, description, id, status, onDelete, onStatusChange }) => {
  const statusFlow = ["To Do", "In Progress", "Done"];

  const getNextStatus = (current) => {
    const currentIndex = statusFlow.indexOf(current);
    return statusFlow[(currentIndex + 1) % statusFlow.length];
  };

  const changeStatusHandler = async () => {
    const newStatus = getNextStatus(status);
    if (!id || !newStatus) {
      toast.error("Invalid task ID or status");
      return;
    }

    try {
      const { data } = await changeStatusTodoFn(id, newStatus);
      if (data.success) {
        toast.success(`Status changed to "${newStatus}"`);
        onStatusChange(id, newStatus);
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const deleteHandler = async () => {
    if (!id) {
      toast.error("Invalid ID");
      return;
    }

    try {
      const res = await deleteTodoFn(id);
      if (res.data) {
        toast.success("Deleted successfully");
        onDelete(id);
      }
    } catch (error) {
      toast.error("Error while deleting todo");
    }
  };

  const updateHandler = () => {
    // Placeholder for future update logic
  };

  const renderStatusIcon = () => {
    if (status === "Done") {
      return <LuCircleCheckBig className="text-green-500 text-2xl" />;
    } else if (status === "In Progress") {
      return <LuCircleDashed className="text-yellow-500 text-2xl animate-pulse" />;
    } else {
      return <LuCircleDashed className="text-gray-500 text-2xl" />;
    }
  };

  return (
    <div
      className={`p-4 flex items-center justify-between rounded-lg shadow-md transition-all duration-200 
        ${status === "Done"
          ? 'bg-green-100'
          : status === "In Progress"
            ? 'bg-yellow-100'
            : 'bg-white'} hover:bg-gray-100`}
    >
      <div>
        <div className='flex gap-x-2 items-center cursor-pointer' onClick={changeStatusHandler}>
          {renderStatusIcon()}
          <p className={`text-lg font-semibold ${status === "Done" ? 'line-through text-gray-500' : ''}`}>
            {title}
          </p>
        </div>
        <p className={`mt-2 text-sm ${status === "Done" ? 'line-through text-gray-400' : ''}`}>
          {description}
        </p>
      </div>

      <div className='flex text-gray-500 text-2xl gap-3'>
        <div onClick={updateHandler}>
          <FiEdit />
        </div>
        <MdDeleteOutline onClick={deleteHandler} />
      </div>
    </div>
  );
};
