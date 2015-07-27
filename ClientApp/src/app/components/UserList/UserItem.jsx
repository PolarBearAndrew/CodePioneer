
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui元件
let Checkbox = mui.Checkbox;
let FontIcon = mui.FontIcon;
let Paper = mui.Paper;
let Avatar = mui.Avatar;

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

        let pic={
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
        };

        let avatar = {
            marginTop:'50px',
            marginRight:'70px',
        };

        let heart={
            left: '-37px',
            top:'-35px',
            fontSize:'80px',
        };

        let checkbox={
            marginTop:'50px',
            width:'25px'
        };

        let info ={
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'flex-start',
            marginTop:'15px'
        };

	    return (
	    	<Paper className="paperCard" zDepth={1}>
                    <div style={pic}>
                        <Avatar style={avatar} src="images/github10.png" />
                        <Checkbox
                                style={checkbox}
                                checkedIcon={<FontIcon  className="material-icons" style={heart}
                                color={Colors.pink500}>favorite</FontIcon>}
                                unCheckedIcon={<FontIcon className="material-icons" style={heart}
                                color={Colors.pink500}>favorite_border</FontIcon>} />
                    </div>

                    <div style={info} className="article">
                        <p className="infoContent">Name : { this.props.data } </p>
                        <p className="infoContent">Skill</p>
                        <p className="infoContent">Interest</p>
                        <p className="infoContent">other</p>
                    </div>
            </Paper>
	    );

	},
});

module.exports = userItem;