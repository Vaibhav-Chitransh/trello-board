const express = require('express');
const app = express();

const users = [];
const organizations = [];
const boards = [];
const issues = [];

// CREATE

app.post('/signup', (req, res) => {

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