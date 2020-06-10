var React = require('react');
var Link = require('react-router').Link;
import List from 'react-virtualized/dist/commonjs/List';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

var userService = require('../services/user');

module.exports = React.createClass({
    getInitialState: function() {
        return {
            users: [],
            query: ''
        };
    },
    componentDidMount: function() {
        var _this = this;
        userService.getList().then(function (users) {
            _this.setState({ users: users });
        })
        .catch(function(e) {
           console.error('Could not load list of users', e);
        });
    },
    handleInputChange: function(event) {
        this.setState({ query: event.target.value });
    },
    render: function() {
        var users = this.state.users;
        var query = this.state.query;
        if(query) {
            users = users.filter(function (user) {
                return user.name.toLowerCase().indexOf(query.toLowerCase()) > -1;
            });
        }

        const rowRenderer = ({
                                 index, // Index of row within collection
                                 style, // Style object to be applied to row (to position it)
                             }) => {
            const user = users[index];

            return (
                <Link key={user.id} className="user" activeClassName="selected" to={'/user/' + user.id} style={style}>
                    <img src={'http://graph.facebook.com/' + user.id + '/picture?type=square'} />
                    <div className="name">{user.name}</div>
                </Link>
            );
        }

        var userNodes = <AutoSizer>{({ height, width }) => (<List
            width={width}
            height={height}
            rowCount={users.length}
            rowHeight={71}
            rowRenderer={rowRenderer}
        />)}</AutoSizer>;

        return (
            <div style={{height: '100%'}}>
                <input className="search" type="text" placeholder="Search" onChange={this.handleInputChange} value={this.state.query}/>
                <div style={{height: '100%'}}>{userNodes}</div>
            </div>
        );
    }
});
