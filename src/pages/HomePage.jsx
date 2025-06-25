import React from "react";
import { useNavigate } from "react-router-dom";


export const HomePage = () => {
  const navigate = useNavigate()

  const navigateHandler = ()=> navigate('/login')
  
  return (
    <div className=" min-h-screen bg-blue-100 flex flex-col justify-center items-center px-6">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome to TodoMaster 📝
        </h1>
        <p className="text-gray-600 text-center mt-3">
          Organize your tasks, stay productive, and never miss a deadline again!
        </p>

        {/* Login Section */}
        <div className="mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700">🚀 Get Started with Login</h2>
          <p className="text-gray-600 mt-2">
            Sign in to access your tasks, create new todos, and keep track of your progress. 
            <br /> Don't have an account? <span onClick={()=>navigate('/register')} className="text-blue-600 cursor-pointer">Sign Up</span> now!
          </p>  
        </div>

        {/* Todo List Section */}
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-gray-700">📋 Todo List</h2>
          <p className="text-gray-600 mt-2">
            Stay on top of your tasks with ease. Create new todos, mark them as completed, and delete them when done.
            <br /> It's simple, efficient, and designed to make your life easier.
          </p>

          {/* Todo Actions */}
          <div className="mt-4 flex justify-around">
            <button className="bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition"
            onClick={navigateHandler}>
              Add New Todo
            </button>
            <button className="bg-red-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-red-700 transition"
            onClick={navigateHandler}>
              Delete Completed Todos
            </button>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-8 flex justify-center">
          <button className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          onClick={navigateHandler}>
            Start Organizing Your Todos
          </button>
        </div>
      </div>
    </div>
  );
};
