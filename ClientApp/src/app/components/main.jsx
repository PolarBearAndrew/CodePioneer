
//react 初始化
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let TextField=mui.TextField;
let RaisedButton=mui.RaisedButton;







//react 自製元件


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
        //css
	    let containerStyle = {
	    	padding: '0px',
            height : '300px',
            width : '300px',
            display: '-webkit-flex',
            display:'flex',
            alignItems: 'center',
            justifyContent: 'center', 
            flexDirection: 'column'
	    };
<<<<<<< HEAD
        
	    return (
	    	<div style={containerStyle}>
                <TextField 
                        hintText="input your Account"
                        multiLine={true} />

                <TextField
                    hintText="input your password"
                    defaultValue="Custom Child input (e.g. password)"
                    floatingLabelText="">
                    <input type="password" />
                    </TextField>
                <br/><br/> 
                <RaisedButton label="Login" primary={true} />   
                <h4>Forger your password</h4>
            </div>
=======

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
		     payload: 'https://github.com/PolarBearAndrew/CodePioneer',
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
>>>>>>> 4d1fb9908f268b6dec728fd25f8b926a684bdee3
	    );
	},
    
    _handleErrorInputChange(){
        
    },


});

module.exports = Main;
