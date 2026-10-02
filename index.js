const express = require('express');
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

    const userExist = USERS.find((user) => user.username == username);
    if(userExist) return res.status(403).json({message: "User with this username already exists"});

    USERS.push({id: USER_ID++, username, password});
    res.status(201).json({message: "You have signed up successfully"});
});

app.post('/signin', (req, res) => {

});

app.post('/organization', (req, res) => {

});

// /board?organizationId=2   ->  Board will be related to some organization which I will pass as query params
app.post('/board', (req, res) => {

});

app.post('/add-member-to-organization', (req, res) => {

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
app.delete('/members', (req, res) => {

})

app.listen(3000);