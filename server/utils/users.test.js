const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;
  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'react Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () =>{
    var users = new Users();
    var newUser = {id: '123', name: 'Jason', room: 'The Office fans'};
    var resUser = users.addUser(newUser.id, newUser.name, newUser.room);

    expect(users.users).toEqual([newUser]);
  });

  it('should return names for Node Course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });
  
  it('should return names for react Course', () => {
    var userList = users.getUserList('react Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove user', () => {
    var user = users.removeUser('1');
    
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () =>{
    var user = users.removeUser(1234);
    
    expect(users.users.length).toBe(3);
    expect(user).toNotExist();
  });

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user).toEqual({id: '1', name: 'Mike', room: 'Node Course'})
  });

  it('should not find user', () => {
    var user = users.getUser('efgsaddfgf1');
    expect(user).toNotExist();
  }); 
})