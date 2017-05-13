const express = require('express');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '..', '/public')
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');
  
  socket.on('disconnect', () => {
    console.log('Client disconnected from server')
  });

  socket.emit('newMessage', {
    from: 'Jason',
    text: 'Hello everybody!',
    createdAt: 123
  });

  socket.on('createMessage', (newMessage) => {
    console.log('New message created', newMessage);
  });
});


server.listen(port, () => {
 console.log(`Server is listening on port ${port}.`)
})