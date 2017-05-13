const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');

const publicPath = path.join(__dirname, '..', '/public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined chat'));

  socket.on('disconnect', () => {
    console.log('Client disconnected from server')
  });

  socket.on('createMessage', (newMessage) => {
    console.log('New message created', newMessage);

    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));

    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // })
  });
});


server.listen(port, () => {
 console.log(`Server is listening on port ${port}.`)
})