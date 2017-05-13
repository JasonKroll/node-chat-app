var socket = io();

socket.on('connect', function () {
  console.log('Connected to server')

  socket.emit('createMessage', {
    from: 'Fiona',
    text: 'Yada yada yada'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
  console.log('Received a new message', message)
});