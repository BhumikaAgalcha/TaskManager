const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find({role: 'member'}).select("-password");

        //add Task count to each user
        const usersWithTaskCount = await Promise.all(users.map(async (user) => {
           const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: 'pending' });
           const inProgressTasks = await Task.countDocuments({ assignedTo: user._id, status: 'in-progress' });
           const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: 'completed' });

              return {
                ...user._doc,
                pendingTasks,
                inProgressTasks,
                completedTasks
              };
        }));
        res.json(usersWithTaskCounts);

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin


module.exports = {getUsers, getUserById};
