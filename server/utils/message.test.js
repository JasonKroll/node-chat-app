var expect = require('expect');
var {generateMessage, generateLocationMessage} = require('./message')


describe('generateMessage', () => {
  it('should generate correct message object', () => {
    var from = 'jason';
    var text = 'Hello world'
    var message = generateMessage(from, text);

    // this
    expect(message.from).toBe(from);
    expect(message.text).toBe(text);
    // or
    expect(message).toInclude({
      from,
      text
    })
    expect(message.createdAt).toBeA('number');
  })
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    var from = 'jason'
    var lat = '-21'
    var long = '149'
    var url = 'https://www.google.com/maps?q=-21,149'
    var message = generateLocationMessage(from, lat, long)
    expect(message.createdAt).toBeA('number');
    expect(message).toInclude({
      from,
      url
    })
    
    // expect()
  })
})