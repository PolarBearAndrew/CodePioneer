
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let Paper = mui.Paper;

//componentes
let UserItem = require('./UserItem.jsx');

//debug
let debug = require('debug')('app:user');


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

		debug('[props]', this.props);

        let paperBg={
            display:'flex',
            webkitFlexWrap: 'wrap',
            flexWrap: 'wrap',
            justifyContent:'space-around',
        };

//        let a={
//            display:'flex',
//            alignContent:'flex-start'
//        };
        let nameList = ['Andrew', 'Ray', 'Doro', 'Husan', 'Panda1', 'Panda2', 'Panda3', 'Panda4'];

        let userItems = nameList.map( (value, index) => {
            return <UserItem data={ value } key={ value }/> ;
        })

	    return (
                <Paper style={paperBg} zDepth={2}>
                    { userItems }
                </Paper>
	    );

	},
});

module.exports = userContainer;