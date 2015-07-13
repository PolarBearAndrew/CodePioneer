
//react 初始化
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let TextField=mui.TextField;
let RaisedButton=mui.RaisedButton;
let Dialog = mui.Dialog;

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
            flexDirection: 'column',
	    };

        let h4 = {
            cursor:'pointer'
        };

        //mui dialog的按鈕設定資料
	    let standardActions = [
	    	{ text: 'sure' },
	    	{ text: 'submit' }
	    ];

	    return (
	    	<div className="loginTab" style={containerStyle}>
                <TextField
                		id="email"
                        hintText="input your Account"
                        multiLine={true} />

                <TextField
                	id="pwd"
                    hintText="input your password"
                    defaultValue="Custom Child input (e.g. password)"
                    floatingLabelText="">
                    <input type="password" />
                    </TextField>
                <br/><br/>

                <RaisedButton label="Login" primary={true} onTouchTap={this._handleTouchTap} />

                <h4>Forger your password</h4>

                <Dialog
			        title="your e-mail"
			        actions={standardActions}
			        ref="myDialog">
			        You can type any thing you want to say at here
		        </Dialog>
            </div>
	    );
	},

    _handleTouchTap(){

   		let showDialog = this.refs.myDialog.show;

    	let email = $('#email').val();
    	let pwd = $('#pwd').val();

    	Actions.login({ email, pwd }, showDialog);
    },

});

module.exports = Main;