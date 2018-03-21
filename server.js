const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const uniqid = require('uniqid');
const bodyParser = require('body-parser');
const CONSTANTS = require('./common/const');

const messages = [];

app.use(bodyParser.json());

app.use('/static', express.static('build/static'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/build/index.html');
});

app.post('/login', function(req, res) {
  let user = req.body;
  user.id = uniqid();
  user.avatar = `https://api.adorable.io/avatars/5/${
    user.username
  }@adorable.png`;
  res.json(user);
});

io.on('connection', function(socket) {
  console.log('a user connected');

  socket.on(CONSTANTS.SERVER_MESSAGE, function(data) {
    messages.push({
      user: data.user.username,
      message: data.message,
      id: uniqid(),
      avatar: data.user.avatar
    });
    io.emit(CONSTANTS.CLIENT_MESSAGE, messages);
  });
});

server.listen(4000, function() {
  console.log('listening on *:4000');
});
