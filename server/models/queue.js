const mongoose = require("mongoose");

const QueueSchema = mongoose.Schema ({
    user_id: {type: String, required: true },
    username: {type: String, required: true}
}, {timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
}})

mongoose.model("Queue", QueueSchema)