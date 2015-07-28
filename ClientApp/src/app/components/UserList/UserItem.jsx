
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let Checkbox = mui.Checkbox;
let FontIcon = mui.FontIcon;
let Paper = mui.Paper;
let Avatar = mui.Avatar;

//debug
let debug = require('debug')('app:user');


let userItem = React.createClass({

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

//        let pic={
//            display:'flex',
//            flexDirection:'row',
//            justifyContent:'center',
//            alignItems:'center',
//        };
        let avatar = {
            margin:'0px',
            marginTop:'15px',
        };

        let follow={
            left: '-7px',
            top:'-8px',
            fontSize:'40px',
        };

        let checkbox={
            margin:'0px',
            padding:'0px',
            marginBottom:'15px',
            marginLeft:'280px',
            width:'25px',
        };

        let info ={
            padding:'0px',
            margin:'0px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'flex-start',
//            marginTop:'8px',
        };

	    return (
	    	<Paper className="paperCard" zDepth={1} key={ this.props.data }>
                    <Avatar style={avatar} size={70} src="images/github10.png" />
                    <div style={info} className="article">
                        <p className="infoContent">{ this.props.data } </p>
                        <p className="infoContent">Skill</p>
                        <Checkbox
                                style={checkbox}
                                checkedIcon={<FontIcon  className="material-icons" style={follow}
                                color={Colors.pink500}>star</FontIcon>}
                                unCheckedIcon={<FontIcon className="material-icons" style={follow}
                                color={Colors.pink500}>star_border</FontIcon>} />
                    </div>
            </Paper>
	    );

	},
});

module.exports = userItem;