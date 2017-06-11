class Users {
  constructor () {
    this.users = [];
  }

  addUser (id, name, room) {
    var user = {id, name, room};
    this.users.push(user);
    return user
  };

  removeUser (id) {
    // return user that was removed
    var user = this.getUser(id);

    if (user) {
      this.users.splice( this.users.indexOf(user), 1 );
      return user;
    };

    return user
  };

  getUser (id) {
   return this.users.filter((u) => u.id === id)[0];
  };

  getUserList (room) {
    var users = this.users.filter((u) => u.room === room);
    var names = users.map((user) => user.name);
    return names
  };

};

module.exports = {Users}