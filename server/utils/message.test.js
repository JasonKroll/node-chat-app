var expect = require('expect');
var {generateMessage} = require('./message')


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