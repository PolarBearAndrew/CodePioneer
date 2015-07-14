//要顯示的元件或是HTML元素寫在render的return裡面
//==========================================
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui元件
//範例:
//let AppBar = mui.AppBar;

let container = React.createClass({

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

		console.log('here is container');

	    return (
    		<h1>this is container </h1>
	    );

	},
});

module.exports = container;