//react 初始化
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let TextField = mui.TextField;
let RaisedButton = mui.RaisedButton;
let Dialog = mui.Dialog;
let FlatButton = mui.FlatButton;
let Snackbar = mui.Snackbar;

//for uplode img
var files;

//flux 資料相關
let actionsUser = require('../../actions/AppActions_User.jsx');
let AppConstants = require('../../constants/AppConstants.js');

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
        // accent1Color: Colors.deepOrange500 按鈕顏色
		});
        // ThemeManager.setTheme(ThemeManager.types.DARK);
	},

    //將 SignUp 兩個TextField，區分
    getInitialState() {
    return {
        errormail: 'This field is required.',
        errorpassword: 'This field is required.',
        };
    },

	//顯示畫面的func
	render() {

        // Add events
        $('input[type=file]').on('change', (event) => {
            files = event.target.files;
        });

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
	    	{ text: 'Submit', onTouchTap: this._forgetPwd }
	    ];

	    return (
	    	<div className="loginTab" style={containerStyle}>

                <TextField
                		id="email"
                        hintText="e-mail address"
                        />

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

                <br/>

                <FlatButton label="Forget password" primary={true} onTouchTap={this._Forget}/>

                <Dialog
			        title="Forget your password ?"
                    actions={emailPwdActions}
			        ref="ForgetDialog">
			        <TextField
                		id="forgetPwdEmail"
                        hintText="e-mail address" />
		        </Dialog>

                <Dialog
			        title="SignUp"
			        actions={[
                        { text: 'sure', onTouchTap: this._onSingupSubmit, ref: 'submit' } ]}
                    actionFocus="submit"
			        ref="SignUpDialog">
			        <TextField
                        id="signUpName"
                        hintText="name"
                        errorText={this.state.errormail}
                        onChange={this._SignUpmail} />
                    <br/>
                    <TextField
                        id="signUpEmail"
                        hintText="email address"
                        errorText={this.state.errormail}
                        onChange={this._SignUpmail} />
                    <br/>
                    <TextField
                        id="signUpPwd"
                        hintText="password"
                        errorText={this.state.errorpassword}
                        onChange={this._SignUppassword} />
                    <br/>
                    <input type="file" id="img"  />
		        </Dialog>

                <Snackbar
                      ref="loginFailSnackbar"
                      message="Login fail, please try again or use email to retrieve your password." />

                <Snackbar
                      ref="singUpSuccessSnackbar"
                      message="Sign up success, please login in."
                      autoHideDuration={this.state.autoHideDuration} />

            </div>
	    );
	},

    //Login按鈕
    _Login(){
    	let email = $('#email').val();
    	let pwd = $('#pwd').val();
        let loginFail = this.refs.loginFailSnackbar.show; //錯誤會有 Snackbar
        actionsUser.login({ email, pwd }, loginFail);
    },

    _Forget(){
   	    this.refs.ForgetDialog.show();
    },

    _SignUp(){
   	    this.refs.SignUpDialog.show();
    },

    _SignUpmail(e) {

        //這邊可以塞email正規演算

        this.setState({
          errormail: e.target.value ? '' : 'This field is required.'
        });
    },

    _SignUppassword(e) {
        this.setState({
          errorpassword: e.target.value ? '' : 'This field is required.'
        });
    },

    _onSingupSubmit(e){

        let inputImg = $('#img');

        let info = {
            email: $('#signUpEmail').val(),
            pwd: $('#signUpPwd').val(),
            name: $('#signUpName').val(),
        }

        let signupSuccess = () => {
            this.refs.singUpSuccessSnackbar.show();
            this.refs.SignUpDialog.dismiss();
        };

        actionsUser.signUp( info, signupSuccess);

        //upload img
        var data = new FormData();

        $.each(files, (key, value) => {
            data.append(key, value);
        });

        $.ajax({
            url: 'submit.php?files',
            type: 'POST',
            data: data,
            cache: false,
            dataType: 'json',
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {
                if(typeof data.error === 'undefined')
                {
                    // Success so call function to process the form
                    submitForm(event, data);
                }
                else
                {
                    // Handle errors here
                    console.log('ERRORS: ' + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                console.log('ERRORS: ' + textStatus);
                // STOP LOADING SPINNER
            }
        });
    },

    _forgetPwd(){
        let email = $('#forgetPwdEmail').val();
        this.refs.ForgetDialog.dismiss();
        actionsUser.forgetPwd({ email });
    },

});

module.exports = loginApp;