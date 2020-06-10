var userService = require('../services/user');

var userController = {};
userController.listUsers = function(req, res) {
    return userService.getList()
        .then(function(response) {
            res.json(response);
        })
        .catch(function(err) {
            console.error('Could not get list', err);
            var isNotAuthenticated = err.type === 'OAuthException';
            if (isNotAuthenticated) {
                res.sendStatus(401);
            }
            res.sendStatus(500);
        });
};

userController.viewUser = function(req, res) {
    var userId = req.params.userId;
    var user = userService.getUser(userId);
    res.json(user);
};

module.exports = userController;
