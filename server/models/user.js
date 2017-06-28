const mongoose = require("mongoose");

const UserSchema = mongoose.Schema ({
    username: {type: String, required: true, unique: true },
    password: {type: String, required: true }
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}})

mongoose.model("User", UserSchema)