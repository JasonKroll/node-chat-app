var socket = io();

socket.on('connect', function () {
  console.log('Connected to server')
});

socket.on('disconnect', function () {
  console.log('Disconnected from server')
});

socket.on('newMessage', function (message) {
  console.log('Received a new message', message)
  var li = $('<li></li>');
  
  // es6 features won't work with IE. Need to use webpack
  // li.text(`${message.from}: ${message.text}`);
  li.text(message.from + ': ' + message.text);

  $('#messages').append(li);
});

$("#message-form").on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {
    
  })
  $('[name=message]').val("");
});
