var Bluebird = require('bluebird');
var _ = require('lodash');
// make a usermap file if you want to use names of your friends instead of ids
var USERMAP = require('./usermap.json');

var facebookService = {};

facebookService.getUsers = _.memoize(function (userIds) {
    var users = _(userIds).map(function (id) {
        var name = USERMAP[id];
        return {
            id: id,
            name: name ? name : id
        }
    })

    return Bluebird.resolve(users);
});

module.exports = facebookService;
