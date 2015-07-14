
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
    
    //errorText
    getInitialState() {
    return {
      errormail: 'This field is required.',
         errorpassword: 'This field is required.',
         };
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
        
        let componentInfo = [
            {
                name: 'Props',
                infoArray: [
                {
                    name: 'errorText',
                    type: 'string',
                    header: 'optional',
                    desc: 'The error text string to display.'
                },
                ]
            },
        ]

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
                    <RaisedButton label="SignUp" primary={false} onTouchTap={this._SignUp}/>
                    <RaisedButton label="Login" primary={true} onTouchTap={this._Login} />
                </div>

                <h4 onTouchTap={this._Forget}> Forget your password</h4>

                <Dialog
			        title="Login Fail"
			        actions={ [{ text: 'sure' }] }
			        ref="loginFailDialog">
			        Login fail, please try again or use email to retrieve your password.
		        </Dialog>
            
                <Dialog
			        title="Login Forget"
                    actions={emailPwdActions}
//			        actions={ [{ text: 'sure' }] }
			        ref="ForgetDialog">
			        <TextField
                		id="email"
                        hintText="e-mail address"
                        multiLine={true} />
		        </Dialog>

                <Dialog
			        title="SignUp"
			        actions={ [{ text: 'sure' }] }
			        ref="SignUpDialog">
			        <TextField
                        multiLine={true}
                        hintText="e-mail address"
                        errorText={this.state.errormail}
                        onChange={this._SignUpmail} />
                    <br/>
                    <TextField
                        hintText="password"
                        errorText={this.state.errorpassword}
                        onChange={this._SignUppassword} />
		        </Dialog>
            
            </div>
	    );
	},

    _Login(){

   		let loginFail = this.refs.loginFailDialog.show;

    	let email = $('#email').val();
    	let pwd = $('#pwd').val();

    	Actions.login({ email, pwd }, loginFail);
    },
    
    _Forget(){

   	    this.refs.ForgetDialog.show();

    	Actions.load();
    },
    
    _SignUp(){

   	    this.refs.SignUpDialog.show();

    	Actions.load();
    },
    
    _SignUpmail(e) {
        this.setState({
          errormail: e.target.value ? '' : 'This field is required.'
        });
    },
    
    _SignUppassword(e) {
        this.setState({
          errorpassword: e.target.value ? '' : 'This field is required.'
        });
    },

});

module.exports = loginApp;