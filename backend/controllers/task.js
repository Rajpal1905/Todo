const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ success: false, msg: "Authentication required." });
    if (!title) return res.status(400).json({ success: false, msg: "Title is required." });

    const newTask = await Task.createTask({
      title,
      description,
      status: "To Do",
      userId,
    });

    return res.status(201).json({ success: true, msg: "Task created.", task: newTask });
  } catch (error) {
    console.error("Create Task Error:", error);
    res.status(500).json({ success: false, msg: "Server error.", error: error.message });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, msg: "Login required." });

    const tasks = await Task.getTasksByUserId(userId);
    if (tasks.length === 0) {
      return res.status(404).json({ success: false, msg: "No tasks found." });
    }

    res.status(200).json({ success: true, tasks });
  } catch (error) {
    console.error("Get Tasks Error:", error);
    res.status(500).json({ success: false, msg: "Server error.", error: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.body;
    const userId = req.user?.id;
    if (!userId) return res.status(401).json({ success: false, msg: "Login required." });

    const deleted = await Task.deleteTask(taskId, userId);
    if (!deleted) {
      return res.status(404).json({ success: false, msg: "Task not found or unauthorized." });
    }

    res.status(200).json({ success: true, msg: "Task deleted." });
  } catch (error) {
    console.error("Delete Task Error:", error);
    res.status(500).json({ success: false, msg: "Server error.", error: error.message });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { taskId, status } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ success: false, msg: "Login required." });

    const allowedStatuses = ["To Do", "In Progress", "Done"];
    if (!status || !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, msg: `Invalid status. Must be: ${allowedStatuses.join(', ')}` });
    }


    const updatedTask = await Task.updateTaskStatus(taskId, status, userId);

    console.log(updatedTask ,"qwertyuioplkjhgfdsa");
    
    if (!updatedTask) {
      return res.status(404).json({ success: false, msg: "Task not found or unauthorized." });
    }

    res.status(200).json({ success: true, msg: "Status updated.", task: updatedTask });
  } catch (error) {
    console.error("Change Status Error:", error);
    res.status(500).json({ success: false, msg: "Server error.", error: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId, title, description, status } = req.body;
    const userId = req.user?.id;

    if (!userId) return res.status(401).json({ success: false, msg: "Login required." });

    const allowedStatuses = ["To Do", "In Progress", "Done"];
    if (status && !allowedStatuses.includes(status)) {
      return res.status(400).json({ success: false, msg: `Invalid status. Must be: ${allowedStatuses.join(', ')}` });
    }

    const updatedTask = await Task.updateTask(taskId, userId, { title, description, status });
    if (!updatedTask) {
      return res.status(404).json({ success: false, msg: "Task not found or unauthorized." });
    }

    res.status(200).json({ success: true, msg: "Task updated.", task: updatedTask });
  } catch (error) {
    console.error("Update Task Error:", error);
    res.status(500).json({ success: false, msg: "Server error.", error: error.message });
  }
};
