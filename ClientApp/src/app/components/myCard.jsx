
let React = require('react');

let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let Card = mui.Card;
let CardHeader = mui.CardHeader;
let CardMedia = mui.CardMedia;
let CardTitle = mui.CardTitle;
let CardActions = mui.CardActions;
let FlatButton = mui.FlatButton;
let CardText = mui.CardText;
let Avatar = mui.Avatar;

let myCard = React.createClass({

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

		console.log('使用元件增加一個東西');
// <h1 id={this.props.id}> this is a card </h1>
	    return (

	    	<Card id={this.props.id} >
	        	<CardHeader
		            title="Title"
		            subtitle="Subtitle"
		            avatar={<Avatar>A</Avatar>}/>
	         	<CardHeader
		            title="Demo Url Based Avatar"
		            subtitle="Subtitle"
		            avatar="http://lorempixel.com/100/100/nature/"/>
	          	<CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
	            	<img src="http://lorempixel.com/600/337/nature/"/>
	          	</CardMedia>
	          	<CardTitle title="Title" subtitle="Subtitle"/>
	          	<CardActions>
		            <FlatButton label="Action1"/>
		            <FlatButton label="Action2"/>
	          	</CardActions>
		        <CardText>
		            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		        </CardText>
	        </Card>


	    );

	},

	_handleTouchTap() {


	}

});

module.exports = myCard;


// <Card>
	     //    	<CardHeader
		    //         title="Title"
		    //         subtitle="Subtitle"
		    //         avatar={<Avatar>A</Avatar>}/>
	     //     	<CardHeader
		    //         title="Demo Url Based Avatar"
		    //         subtitle="Subtitle"
		    //         avatar="http://lorempixel.com/100/100/nature/"/>
	     //      	<CardMedia overlay={<CardTitle title="Title" subtitle="Subtitle"/>}>
	     //        	<img src="http://lorempixel.com/600/337/nature/"/>
	     //      	</CardMedia>
	     //      	<CardTitle title="Title" subtitle="Subtitle"/>
	     //      	<CardActions>
		    //         <FlatButton label="Action1"/>
		    //         <FlatButton label="Action2"/>
	     //      	</CardActions>
		    //     <CardText>
		    //         Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		    //         Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
		    //         Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
		    //         Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
		    //     </CardText>
	     //    </Card>
