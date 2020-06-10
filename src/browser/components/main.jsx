// React
var React = require('react');
var ReactDOM = require('react-dom');

// React Router
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var browserHistory = require('react-router').browserHistory;

// Components
var Users = require('./Users.jsx');
var User = require('./User.jsx');

// Styles
require('./main.less');

var App = React.createClass({
    render() {
        return (
            <div>
                <div className="content">{this.props.children}</div>
                <div className="user-list">
                    <Users/>
                </div>
            </div>
        );
    }
});


ReactDOM.render((
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <Route path="/user/:userId" component={User}/>
      </Route>
    </Router>
), document.getElementById('sleep-stats-app'));
