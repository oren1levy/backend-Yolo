import userService from "../services/users-service.js";
import UserModel from "../models/users-model.js";

const registerController = async (req, res) => {
    try {
        const user = new UserModel(req.body);
        const savedUser = await userService.register(user);
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.login(email, password);
        res.status(200).json(user);
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};

const updateUserController = async (req, res) => {
    const { userId } = req.params; 
    const updatedFields = req.body; 
    try {
        const updatedUser = await userService.updateUser(userId, updatedFields);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const deletedUser = await userService.deleteUser(userId);
        if (deletedUser) {
            res.status(200).json(deletedUser);
        } else {
            res.status(401).json({ message: "Problem with deleting user" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const searchUserController = async (req, res) => {
    try {
        const { userId } = req.params;
        const searchUser = await userService.searchUser(userId);
        if (searchUser) {
            res.status(200).json(searchUser);
        } else {
            res.status(401).json({ message: "Problem with serach user" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default {
    registerController,
    loginController,
    updateUserController,
    deleteUserController,
    searchUserController

};