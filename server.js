const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uniqid = require('uniqid');
const bodyParser = require('body-parser');
const cors = require('cors');
const CONSTANTS = require('./common/const');

const messages = [];
let connectedUsers = [];

app.use(cors());
app.use(bodyParser.json());

app.use('/static', express.static('build/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

/**
 * On login:
 * 1. Add the user to connected users list
 * 2. publish the new list and also the message so the new user gets the messages history
 * 3. return the newly created user object
 */
app.post('/login', function(req, res) {
  let user = req.body;
  if (!connectedUsers.find(item => item.id === user.id)) {
    user.id = uniqid();
    user.avatar = `https://api.adorable.io/avatars/5/${
      user.username
    }@adorable.png`;
  }
  res.json(user);
});

io.on('connection', function(socket) {
  console.log('socket connected');
  //on message recieved, broadcast it to the rest of the world
  //but not to the one that sent the message
  socket.on(CONSTANTS.DISTRIBUTE_MESSAGES, message => {
    messages.push(message);
    socket.broadcast.emit(CONSTANTS.CLIENT_MESSAGE, messages);
  });

  //listen to when a new user is connected and send the
  //the messages and connected users
  socket.on(CONSTANTS.CLIENT_CONNECTED, user => {
    console.log('new user connected:', user.username)
    connectedUsers.push(user);
    socket.userId = user.id;
    io.emit(CONSTANTS.CONNECTED_USERS, connectedUsers);
    io.emit(CONSTANTS.CLIENT_MESSAGE, messages);
  });

  //When a user disconnects, remove him from the connected users list
  socket.on('disconnect', function() {
    console.log('socket disconnected:', this.userId);
    connectedUsers = connectedUsers.filter(user => user.id !== this.userId);
    io.emit(CONSTANTS.CONNECTED_USERS, connectedUsers);
    socket.disconnect(true);
  });
});

server.listen(4000, function() {
  console.log('listening on *:4000');
});
