const express = require('express');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('./middleware.js');
const { USERS, ORGANIZATIONS } = require("./models.js");
const app = express();

// let USER_ID = 1;
// let ORGANIZATION_ID = 1;
let BOARD_ID = 1;
let ISSUE_ID = 1;

// const USERS = [];
// const ORGANIZATIONS = [];
const BOARDS = [];
const ISSUES = [];

// Issue states => IN_PROGRESS, UP_NEXT, DONE, ARCHIVE
const issueStates = {
    IN_PROGRESS: "IN_PROGRESS",
    UP_NEXT: "UP_NEXT",
    DONE: "DONE",
    ARCHIVE: "ARCHIVE"
}

app.use(express.json());

// CREATE

app.post('/signup', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // const userExist = USERS.find((user) => user.username === username);
    const userExist = await USERS.findOne({username: username});
    if(userExist) return res.status(403).json({message: "User with this username already exists"});

    // USERS.push({id: USER_ID++, username, password});
    const user = await USERS.create({username, password});
    res.status(201).json({message: "You have signed up successfully", id: user._id});
});

app.post('/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    // const userExist = USERS.find((user) => user.username === username && user.password === password);
    const userExist = await USERS.findOne({username: username, password: password});
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

app.post('/board', authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const organizationId = req.body.organizationId;

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization || organization.admin !== userId) return res.status(403).json({message: "Either org doesn't exist or you are not an admin of this org"});

    BOARDS.push({id: BOARD_ID++, title, organizationId});
    res.status(201).json({message: "Board created successfully", id: BOARD_ID - 1});
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

app.post('/issue', authMiddleware, (req, res) => {
    const userId = req.userId;
    const title = req.body.title;
    const boardId = req.body.boardId;

    const board = BOARDS.find((board) => board.id === boardId);
    if(!board) return res.status(403).json({message: "Board does not exist"});

    // only members/admin of the board's organization can create the issue
    const organizationId = board.organizationId;
    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization) return res.status(403).json({message: "Board does not belong to any organization"});

    const isAdmin = userId === organization.admin;
    const isMember = organization.members.includes(userId);

    if(!isAdmin && !isMember) return res.status(403).json({message: "You are not authorized to create issue"});
    
    ISSUES.push({id: ISSUE_ID++, title, state: issueStates.UP_NEXT, boardId});
    res.status(201).json({message: "Issue created successfully", id: ISSUE_ID - 1});
});

// READ

// user will send the organizationId as query params
app.get('/organization', authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization || organization.admin !== userId) return res.status(403).json({message: "Either org doesn't exist or you are not an admin of this org"});

    res.status(200).json({organization: {
        ...organization,
        members: organization.members.map((memberId) => {
            const user = USERS.find((user) => user.id === memberId);
            return {
                id: user.id,
                username: user.username
            }
        })
    }})
});

// user will send the organizationId as query params so that we can fetch all those boards under that organization
app.get('/boards', authMiddleware, (req, res) => {
    const userId = req.userId;
    const organizationId = parseInt(req.query.organizationId);

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);
    if(!organization) return res.status(403).json({message: "Organization does not exist"});

    const boards = BOARDS.filter((board) => board.organizationId === organizationId);
    return res.status(200).json(boards.map((board) => {
        return {
            id: board.id,
            title: board.title
        }
    }));
});

// we will get boardId as query param so that we can fetch all issues of that particular board
app.get('/issues', authMiddleware, (req, res) => {
    const userId = req.userId;
    const boardId = parseInt(req.query.boardId);

    const board = BOARDS.find((board) => board.id === boardId);
    if(!board) return res.status(403).json({message: "Board does not exist"});

    const issues = ISSUES.filter((issue) => issue.boardId === boardId);
    return res.status(200).json(issues.map((issue) => {
        return {
            id: issue.id,
            title: issue.title,
            state: issue.state
        }
    }));
});

app.get('/members', (req, res) => {

});

// UPDATE

// move this issue (change the state)
app.put('/issues', authMiddleware, (req, res) => {
    const userId = req.userId;
    const issueId = req.body.issueId;

    const issue = ISSUES.find((issue) => issue.id === issueId);
    if(!issue) return res.status(403).json({message: "Issue does not exist"});

    const boardId = issue.boardId;   // if there is an issue then the boardId will be correct itself because at the time of creation it must be linked to some board so no need to validate whether the boardId is valid or not => we can directly get the organization to which it belongs to

    const board = BOARDS.find((board) => board.id === boardId);
    const organizationId = board.organizationId;

    const organization = ORGANIZATIONS.find((org) => org.id === organizationId);

    // only admin or a member can update the issue so check whether the current user is an admin or a member
    const isAdmin = userId === organization.admin;
    const isMember = organization.members.includes(userId);

    if(!isAdmin && !isMember) return res.status(403).json({message: "You are not authorized to udpate this issue"});

    // update the issue state to next state
    if(issue.state === issueStates.UP_NEXT) issue.state = issueStates.IN_PROGRESS;
    else if(issue.state === issueStates.IN_PROGRESS) issue.state = issueStates.DONE;
    else if(issue.state === issueStates.DONE) issue.state = issueStates.ARCHIVE;
    else if(issue.state === issueStates.ARCHIVE) return res.status(403).json({message: "Issue already resolved and not in board"});

    res.status(200).json({message: "Issue state updated"});
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