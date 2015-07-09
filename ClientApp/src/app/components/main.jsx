
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

//元件
let MyCard = require('./MyCard.jsx');
//let MyCard = React.createFactory( require('./myCard.jsx') );

//flux
let UserStore = require('../stores/UserStore');
let AppConstants = require('../constants/AppConstants.js');


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
			accent1Color: Colors.lime600
		});
	},

	render() {

	    let containerStyle = {
	    	textAlign: 'center',
	    	padding: '0px',
	    	margin: '0px'
	    };

	    let standardActions = [
	    	{ text: 'sure' },
	    	{ text: 'submit' }
	    ];

	    return (
	    	<div style={containerStyle}>

	    		<AppBar title='CodePioneer' iconClassNameRight="muidocs-icon-navigation-expand-more"/>

		        <Dialog
			        title="Message box"
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

	     	</div>
	    );
	},

	_handleTouchTap() {
		this.refs.myDialog.show();

	}

});

module.exports = Main;
