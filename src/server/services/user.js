var _ = require('lodash');
var dao = require('./dao');
var facebookService = require('./facebook');
var userService = {};

userService.saveUsers = function(users) {
    dao.saveUsers(users);
};

userService.getUser = function(userId) {
    var users = dao.getUsers();
    return _.sortBy(users[userId]);
};

userService.getList = function() {
    var users = dao.getUsers();
    var userIds = Object.keys(users);

    return facebookService.getUsers(userIds)
        .then(function(facebookUsers) {
            return _(facebookUsers)
                .map(function(user) {
                    user.count = users[user.id].length;
                    return user;
                })
                .orderBy('count', 'desc');
        });
};

module.exports = userService;
