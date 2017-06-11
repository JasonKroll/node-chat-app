const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and Room Name are required');
    } 

    socket.join(params.room);
    // socket.leave(params.room)

    // io.emit -> io.to(params.room).emit
    // socket.broadcast.emit -> socket.broadcast.to(params.room).emit
    // socket.emit
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined!`));

    callback();
  });



  socket.on('disconnect', () => {
    console.log('Client disconnected from server')
    var user = users.removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room))
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`))
    }
  });

  socket.on('createMessage', (newMessage, callback) => {
    console.log('New message created', newMessage);

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Location User', coords.latitude, coords.longitude))
  })
});


server.listen(port, () => {
 console.log(`Server is listening on port ${port}.`)
})