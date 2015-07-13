
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
let loginApp = React.createClass({

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
			accent1Color: Colors.deepOrange500
		});
        // ThemeManager.setTheme(ThemeManager.types.DARK);
	},

	//顯示畫面的func
	render() {

        console.log('login app');

        //container
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

        //Login 和 SignUp的按鈕設定
        let btn={
            display:'flex',
            justifyContent:'space-between',
            width : '200px'
        };

        //寄送email取回密碼的dialog的按鈕設定資料
	    let emailPwdActions = [
	    	{ text: 'Cancel' },
	    	{ text: 'Submit' }
	    ];

	    return (
	    	<div className="loginTab" style={containerStyle}>

                <TextField
                		id="email"
                        hintText="e-mail address"
                        multiLine={true} />

                <TextField
                	id="pwd"
                    hintText="password"
                    defaultValue="Custom Child input (e.g. password)"
                    floatingLabelText="">
                    <input type="password" />
                    </TextField>

                <br/><br/>

                <div style={btn}>
                    <RaisedButton label="Sign up" primary={false}/>
                    <RaisedButton label="Login" primary={true} onTouchTap={this._handleTouchTap} />
                </div>

                <h4>Forger your password</h4>

                <Dialog
			        title="Login Fail"
			        actions={ [{ text: 'sure' }] }
			        ref="loginFailDialog">
			        Login fail, please try again or use email to retrieve your password.
		        </Dialog>

            </div>
	    );
	},

    _handleTouchTap(){

   		let loginFail = this.refs.loginFailDialog.show;

    	let email = $('#email').val();
    	let pwd = $('#pwd').val();

    	Actions.login({ email, pwd }, loginFail);
    },

});

module.exports = loginApp;