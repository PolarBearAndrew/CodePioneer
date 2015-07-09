
//react 初始化
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let Dialog = mui.Dialog;
let AppBar = mui.AppBar;
let TimePicker = mui.TimePicker;
let RaisedButton = mui.RaisedButton;
let LeftNav = mui.LeftNav;
let MenuItem = mui.MenuItem;


//react 自製元件
let MyCard = require('./myCard.jsx');

//flux 資料相關
let Actions = require('../actions/AppActions_User.jsx');
let AppConstants = require('../constants/AppConstants.js');
let UserStore = require('../stores/UserStore');


//main是這個元件暫時使用的名字
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

	//顯示畫面的func
	render() {

		//取得使用者資料
		let user = UserStore.getUser();

		//css
	    let containerStyle = {
	    	textAlign: 'center',
	    	padding: '0px',
	    	margin: '0px'
	    };

	    //mui dialog的按鈕設定資料
	    let standardActions = [
	    	{ text: 'sure' },
	    	{ text: 'submit' }
	    ];

	    //mui left menu 的設定資料
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

	    		<AppBar title='CodePioneer'
	    			iconClassNameRight="muidocs-icon-navigation-expand-more"
	    			onLeftIconButtonTouchTap={this._togleLeftNav} />

		        <h2>material-ui demo</h2>

		        <MyCard id={1} />

		        <MyCard id={2} />

		        <MyCard id={3} />

				<TimePicker
				  format="ampm"
				  hintText="12hr Format" />

		        <RaisedButton label="Show Msg" primary={true} onTouchTap={this._handleTouchTap} />

		        <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>

		        <Dialog
			        title="HI PANDA"
			        actions={standardActions}
			        ref="myDialog">
			        You can type any thing you want to say at here
		        </Dialog>


	     	</div>
	    );
	},

	//觸碰或點擊按鈕的事件 掛載在RaisedButton上面
	_handleTouchTap() {
		this.refs.myDialog.show();
		Actions.load();
	},

	//觸碰或點擊left menu的左側icon事件
	_togleLeftNav(){
		this.refs.leftNav.toggle();
	}

});

module.exports = Main;
