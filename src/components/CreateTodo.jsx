import React, { useState } from "react";
import toast from "react-hot-toast";
import {addTodoFn} from "../service/operations/task"
export const CreateTodo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
   
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
   
    try {
      const response = await addTodoFn(formData.title, formData.description);
      if (response) {
        toast.success("Todo added successfully!");
        setFormData({ title: "", description: "" });
      } else {
        toast.error(response?.message || "Failed to add Todo.");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } 
  };
  return (
    <div className="flex justify-center items-center min-h-screen w-full bg-gray-100 overflow-auto p-4 bottom-0">

      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-4">
          Add a New Todo
        </h2>

        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter todo title"
              value={formData.title}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter todo description"
              value={formData.description}
              onChange={changeHandler}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Todo
          </button>
        </form>
      </div>
    </div>
  );
};
