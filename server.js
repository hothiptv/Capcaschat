const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    phone: { type: String, required: true, unique: true }, // Số điện thoại là duy nhất
    password: { type: String, required: true },
    friends: [{ type: String }] // Mảng lưu số điện thoại của bạn bè
});

const User = mongoose.model('User', userSchema);
