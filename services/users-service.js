import UserModel from "../models/users-model.js"

const register = async (user) => {
    const newUser = new UserModel(user);
    const error = newUser.validateSync();
    if (error) {
        throw error;
    }
    return newUser.save();
};

const login = async (email, password) => {
    const user = await UserModel.findOne({ email, password });
    return user;
};

const updateUser = async (userId, updatedFields) => {
    try {
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