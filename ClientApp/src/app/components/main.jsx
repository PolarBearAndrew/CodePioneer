
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
            flexDirection: 'column',
	    };

	    return (
	    	<div className="loginTab" style={containerStyle}>
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
	    );
	},

    _handleErrorInputChange(){

    },


});

module.exports = Main;
