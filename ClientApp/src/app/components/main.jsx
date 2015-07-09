
//react init
let React = require('react');

//mui init
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui元件
let Dialog = mui.Dialog;
let AppBar = mui.AppBar;
let TimePicker = mui.TimePicker;
let RaisedButton = mui.RaisedButton;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;


//react元件
let MyCard = require('./myCard.jsx');
//let MyCard = React.createFactory( require('./myCard.jsx') );

//flux
let UserStore = require('../stores/UserStore');
let AppConstants = require('../constants/AppConstants.js');
let Actions = require('../actions/AppActions_User.jsx');


let Main = React.createClass({

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
			accent1Color: Colors.purple800
		});
	},

	render() {

		let user = UserStore.getUser();

	    let containerStyle = {
	    	textAlign: 'center',
	    	padding: '0px',
	    	margin: '0px'
	    };

	    let standardActions = [
	    	{ text: 'sure' },
	    	{ text: 'submit' }
	    ];

	    var menuItems = [
		  { route: 'get-started', text: 'Get Started' },
		  { route: 'customization', text: 'Customization' },
		  { route: 'components', text: 'Components' },
		  { type: MenuItem.Types.SUBHEADER, text: 'Resources' },
		  {
		     type: MenuItem.Types.LINK,
		     payload: 'https://github.com/callemall/material-ui',
		     text: 'GitHub'
		  },
		  {
		     text: 'Disabled',
		     disabled: true
		  },
		  {
		     type: MenuItem.Types.LINK,
		     payload: 'https://www.google.com',
		     text: 'Disabled Link',
		     disabled: true
		  },
		];


	    return (
	    	<div style={containerStyle}>

	    		<AppBar title='CodePioneer' iconClassNameRight="muidocs-icon-navigation-expand-more"/>

		        <Dialog
			        title="HI PANDA"
			        actions={standardActions}
			        ref="myDialog">
			        You can type any thing you want to say at here
		        </Dialog>

		        <h2>material-ui demo</h2>

		        <MyCard id={1} />
		        <MyCard id={2} />
		        <MyCard id={3} />

				<TimePicker
				  format="ampm"
				  hintText="12hr Format" />

		        <RaisedButton label="Show Msg" primary={true} onTouchTap={this._handleTouchTap} />
				<LeftNav docked={true} menuItems={menuItems} />

	     	</div>
	    );
	},

	_handleTouchTap() {
		this.refs.myDialog.show();
		Actions.load();
	}

});

module.exports = Main;
