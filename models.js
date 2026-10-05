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

const USERS = mongoose.model("users", userSchema);
const ORGANIZATIONS = mongoose.model("organizations", organizationSchema);

module.exports = {
    USERS,
    ORGANIZATIONS
}