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

export default {
    register,
    login
};