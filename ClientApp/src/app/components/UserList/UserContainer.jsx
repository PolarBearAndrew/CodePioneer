
//要顯示的元件或是HTML元素寫在render的return裡面
//==========================================
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui
let Paper = mui.Paper;

//
let UserItem = require('./UserItem.jsx');

let userContainer = React.createClass({

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

        let paperBg={
            display:'flex',
            webkitFlexWrap: 'wrap',
            flexWrap: 'wrap',
            justifyContent:'space-around',
            alignContent: 'flex-start',
        };

        let nameList = ['Andrew', 'Ray', 'Doro', 'Husan'];

        let userItems = nameList.map( (value, index) => {
            return <UserItem data={ value }/> ;
        })

	    return (

	    	<Paper style={paperBg} zDepth={2}>
                { userItems }
            </Paper>
	    );

	},
});

module.exports = userContainer;