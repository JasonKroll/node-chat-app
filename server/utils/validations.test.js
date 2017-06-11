const expect = require('expect');

const {isRealString} = require('./validations');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    var nonStringRes = isRealString(12345);
    expect(nonStringRes).toBe(false)
  });

  it('should string with only spaces', () => {
    var spacesRes = isRealString('    ');
    expect(spacesRes).toBe(false);
  });

  it('should allow strings with non-space characters', () => {
    var validStringRes = isRealString('  Hello World  ');
    expect(validStringRes).toBe(true);
  });
});