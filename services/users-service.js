import UserModel from "../models/users-model.js"
import bcrypt from "bcrypt"

const register = async (user) => {
    const existingUser = await UserModel.findOne({ email: user.email });
    if (existingUser) {
        throw new Error('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);
    user.password = hashedPassword;

    const newUser = new UserModel(user);
    const error = newUser.validateSync();
    if (error) {
        throw error;
    }
    return newUser.save();
};

const login = async (email, password) => {

    const user = await UserModel.findOne({ email });
    if (!user) {
        throw new Error('Invalid email');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid password');
    }

    return user;
};

const updateUser = async (userId, updatedFields) => {
    try {
        if (updatedFields.password) {
            updatedFields.password = await bcrypt.hash(updatedFields.password, 10);
        }
        const updateUser = await UserModel.findByIdAndUpdate(
            userId,
            updatedFields,
            { new: true }
        );
        return updateUser;
    } catch (error) {
        throw new Error(`Failed to update user: ${error.message}`);
    }
};

const deleteUser = async (userId) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            throw new Error('User not found');
        }
        return deletedUser;
    } catch (error) {
        throw new Error('Error deleting user: ' + error.message);
    }
};




export default {
    register,
    login,
    updateUser,
    deleteUser
};