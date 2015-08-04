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

//debug
let debug = require('debug')('app:login');

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

        debug('[props]', this.props);

        actionsUser.login({ email: '123', pwd: '123' }, () => {
            console.log('auto login fail');
        });

        // Add events
        // $('body, html').on('change', 'input[type=file]', (event) => {
        //     files = event.target.files;
        // });

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
//            border:'2px solid black', 
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
        
//        let loginAll={
//            display: '-webkit-flex',
//            display:'flex',
//            alignItems: 'center',
//            justifyContent: 'center',
//            flexDirection: 'column',
//            border:'2px solid black',
//        };
        
//className="loginAll" style={loginAll}
	    return (
            <div className="loginAll">
                <div className="allLoginTitle">
                    <img src="../../../www/images/panda.png" className="loginLogo"/>
                    <p className="loginTitle">CodePioneer</p>
                </div>
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
        /*var data = new FormData();

        // $.each(files, (key, value) => {
        //     console.log('kv', key, value)
        //     data.append(key, value);
        // });
        //
        console.log(files[0])

        data.append('myImg' , files[0]);

        console.log('data', data);

        //dataType: 'json',

        $.ajax({
            url: 'http://localhost:8080/api/users/img',
            type: 'POST',
            data: data,
            cache: false,
            processData: false, // Don't process the files
            contentType: false, // Set content type to false as jQuery will tell the server its a query string request
            success: function(data, textStatus, jqXHR)
            {
                if(typeof data.error === 'undefined')
                {
                    // Success so call function to process the form
                    //submitForm(event, data);
                    console.log('success')
                }
                else
                {
                    // Handle errors here
                    console.log('ERRORS: 1' + data.error);
                }
            },
            error: function(jqXHR, textStatus, errorThrown)
            {
                // Handle errors here
                console.log('ERRORS: 2' + textStatus);
                // STOP LOADING SPINNER
            }
        }); */
    },

    _forgetPwd(){
        let email = $('#forgetPwdEmail').val();
        this.refs.ForgetDialog.dismiss();
        actionsUser.forgetPwd({ email });
    },

});

module.exports = loginApp;