const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware.js');
const app = express();

let USER_ID = 1;
let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

const USERS = [];
const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

app.use(express.json());

// CREATE

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find((user) => user.username === username);
    if(userExist) return res.status(403).json({message: "User with this username already exists"});

    USERS.push({id: USER_ID++, username, password});
    res.status(201).json({message: "You have signed up successfully"});
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const userExist = USERS.find((user) => user.username === username && user.password === password);
    if(!userExist) return res.status(403).json({message: 'User not found'});

    const token = jwt.sign({userId: userExist.id}, "SECRET123");
    res.status(200).json({token});
});

app.post('/organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const description = req.body.description;

    // we can add validation here also on title and description (like it should not be empty but that we will do later)

    ORGANIZATIONS.push({id: ORGANIZATION_ID++, title, description, admin: userId, members: []});
    res.status(201).json({message: "Organization created successfully", id: ORGANIZATION_ID - 1});
});

// /board?organizationId=2   ->  Board will be related to some organization which I will pass as query params
app.post('/board', (req, res) => {

});

app.post('/add-member-to-organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization || organization.admin !== userId) return res.status(403).json({message: "Either org doesn't exist or you are not an admin of this org"});

    const memberUser = USERS.find((user) => user.username === memberUserUsername);
    if(!memberUser) return res.status(403).json({message: "No user with this username exists in our DB"});

    const memberAlreadyExist = organization.members.find((memberId) => memberId === memberUser.id);
    if(memberAlreadyExist) return res.status(403).json({message: "This member is already a part of this organization"});

    organization.members.push(memberUser.id);
    res.status(200).json({message: "New member added"});
});

// /issue?boardId=2    -> Issue will be related to some board that I will pass as query params
// you can also do /issue/:boardId
app.post('/issue', (req, res) => {

});

// READ

app.get('/organization', (req, res) => {

});

app.get('/boards', (req, res) => {

});

app.get('/issues', (req, res) => {

});

app.get('/members', (req, res) => {

});

// UPDATE

// move this issue (change the state)
app.put('/issues', (req, res) => {

})

// DELETE

// remove some member
app.delete('/members', authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = req.body.organizationId;
    const memberUserUsername = req.body.memberUserUsername;

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization || organization.admin !== userId) return res.status(403).json({message: "Either org doesn't exist or you are not an admin of this org"});

    const memberUser = USERS.find((user) => user.username === memberUserUsername);
    if(!memberUser) return res.status(403).json({message: "No user with this username exists in our DB"});

    const memberExist = organization.members.find((memberId) => memberId === memberUser.id);
    if(!memberExist) return res.status(403).json({message: "This member does not exist in the organization"});

    organization.members = organization.members.filter((memberId) => memberId !== memberUser.id);
    res.status(200).json({message: "Member removed from the organization!"});
})

app.listen(3000);