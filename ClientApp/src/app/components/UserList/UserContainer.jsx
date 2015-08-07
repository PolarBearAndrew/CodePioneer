//react
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui元件
let Paper = mui.Paper;

//componentes
let UserItem = require('./UserItem.jsx');

//debug
let debug = require('debug')('app:user container');

//actions
let actionFollow = require('../../actions/AppActions_User.jsx');

let userContainer = React.createClass({

	childContextTypes: {
		muiTheme: React.PropTypes.object
	},

	getChildContext() {
		return {
			muiTheme: ThemeManager.getCurrentTheme()
		};
	},

	componentWillMount() {
		ThemeManager.setPalette({
			accent1Color: Colors.lime600
		});
	},

	render() {

		debug('[props]', this.props);

        let paperBg = {
            display:'flex',
            webkitFlexWrap: 'wrap',
            flexWrap: 'wrap',
            justifyContent:'space-around',
        };

        let nameList = this.props.userList || [];
        // let nameList = ['111', '222', '333'];

        let userItems = nameList.map( (value, index) => {
            return <UserItem data={ value }
            				 key={ index }
            				 user={this.props.user}
            				 follow={ actionFollow.follow }
            				 unfollow={ actionFollow.unfollow } /> ;
        })

	    return (
                <Paper style={paperBg} zDepth={2}>
                    { userItems }
                </Paper>
	    );
	},
});

module.exports = userContainer;