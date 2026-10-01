# Trello app

## Database Schema

```javascript
const users = [{
    id: 1,
    username: "vaibhav",
    password: "123123"
}, {
    id: 2,
    username: "cheryl",
    password: "123123"
}];

const organizations = [{
    id: 1,
    title: "vaibhavs org",
    description: "building trello app",
    admin: 1,
    members: [2]
}, {
    id: 2,
    title: "cheryls org",
    description: "experimenting",
    admin: 2,
    members: []
}];

const boards = [{
    id: 1,
    title: "trello app backend",
    organizationId: 1
}];

const issues = [{
    id: 1,
    title: "add role based access controls",
    boardId: 1
}, {
    id: 2,
    title: "allow admins with more functionalities",
    boardId: 1
}];
```
