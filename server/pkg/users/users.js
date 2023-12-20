const mongoose = require("mongoose");

const {
    User
} = require("./model");

const getAllUsers = async() => {
    return await User.find({});
};

const getOneUser = async(id) => {
    return await User.findOne({_id: id});
};

const getByEmailUser = async(email) => {
    return await User.findOne({ email });
};

const createUser = async(u) => {
    const user = new User(u);
    return await user.save();
};

const updateUser = async(id, newData) => {
    return await User.updateOne({_id: id}, newData);
};

const removeUser = async(id) => {
    return await User.deleteOne({_id: id});
};

const setNewPassword = async(id, new_password) => {
    return await User.updateOne({_id: id}, {password: new_password});
};

module.exports = {
    getAllUsers,
    getOneUser,
    getByEmailUser,
    createUser,
    updateUser,
    removeUser,
    setNewPassword
}