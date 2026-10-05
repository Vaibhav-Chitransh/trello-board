const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
});

const organizationSchema = new mongoose.Schema({
    title: String,
    description: String,
    admin: mongoose.Types.ObjectId,
    members: [mongoose.Types.ObjectId],
});

const boardSchema = new mongoose.Schema({
    title: String,
    organizationId: mongoose.Types.ObjectId,
});

const issueSchema = new mongoose.Schema({
    title: String,
    boardId: mongoose.Types.ObjectId,
    state: {
        type: String,
        enum: ["IN_PROGRESS", "UP_NEXT", "DONE", "ARCHIVE"],
        default: "UP_NEXT"
    }
})

const USERS = mongoose.model("users", userSchema);
const ORGANIZATIONS = mongoose.model("organizations", organizationSchema);
const BOARDS = mongoose.model("boards", boardSchema);
const ISSUES = mongoose.model("issues", issueSchema);

module.exports = {
    USERS,
    ORGANIZATIONS,
    BOARDS,
    ISSUES
}