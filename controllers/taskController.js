const Task = require('../models/TaskModel');
const CompanyProfile = require('../models/CompanyProfile');

exports.createTask = async (req, res) => {
    try {
        const { companyId, ...taskData } = req.body;

        // Fetch the company logo based on the companyId
        const companyProfile = await CompanyProfile.findOne({ companyId });

        if (!companyProfile) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Include the companyLogo in the taskData
        taskData.companyLogo = companyProfile.companyLogo;

        // Create and save the task
        const task = new Task({ companyId, ...taskData });
        await task.save();

        res.status(201).json(task);
    } catch (error) {
        if (error.code === 11000) {
            // Duplicate key error
            res.status(400).json({ message: 'Duplicate taskId' });
        } else {
            res.status(400).json({ error: error.message });
        }
    }
};

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({ taskId: req.params.id });
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { taskId: req.params.id },  // Search by taskId
            req.body,
            { new: true, runValidators: true }
        );
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ taskId: req.params.id });  // Search by taskId
        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Controller function to add a discussion to a task
exports.addOrUpdateDiscussionToTask = async (req, res) => {
    const { taskId } = req.params;
    const { question, answer, username, discussionIndex } = req.body;

    try {
        const task = await Task.findOne({ taskId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        if (discussionIndex !== undefined) {
            // Update existing discussion
            if (task.discussions[discussionIndex]) {
                task.discussions[discussionIndex].answer = answer;
            } else {
                return res.status(400).json({ message: 'Discussion not found' });
            }
        } else {
            // Add new discussion
            task.discussions.push({ question, answer, username });
        }

        await task.save();
        res.status(200).json({ message: 'Discussion updated successfully' });
    } catch (error) {
        console.error('Error updating discussion:', error);
        res.status(500).json({ message: 'Error updating discussion', error });
    }
};

