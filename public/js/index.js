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

socket.on('newLocationMessage', function(message) {
  var li = $('<li></li>');
  
  var a = $('<a target="_blank">My current location</a>');
  li.text(message.from + ": ")

  a.attr('href', message.url)
  li.append(a);

  $('#messages').append(li);
});

// Submit form for sending new message
$("#message-form").on('submit', function (e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from: 'User',
    text: $('[name=message]').val()
  }, function () {
    
  })
  $('[name=message]').val("");
});

var locationButton = $("#send-location");
// click button for sending location
locationButton.on('click', function (e) {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser')
  }
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function () {
    alert('Unable to fetch location!')
  })
});

