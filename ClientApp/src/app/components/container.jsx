//要顯示的元件或是HTML元素寫在render的return裡面
//==========================================
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let TextField=mui.TextField;

let MenuItem = mui.MenuItem;
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;

let IconButton = mui.IconButton;
let Paper = mui.Paper;
let Avatar = mui.Avatar;

let IconMenu = mui.IconMenu;
let List = mui.List;
let ListItem = mui.ListItem;
let ListDivider=mui.ListDivider;

let Checkbox=mui.Checkbox
let FontIcon = mui.FontIcon ;

let ArticleTab = require('./articleTab.jsx');

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

		let containerStyle = {
	    	textAlign: 'center',
	    	padding: '0px',
	    	margin: '0px'
	    };

        var menuItems = [
            { route: 'user',
            text: <IconButton iconClassName="material-icons" >account_circle</IconButton>
            },
            { route: 'latest news', text: 'Latest news' },
            { route: 'search', text: 'Search' },
            { route: 'components', text: 'Components' },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://www.facebook.com/',
                text: 'FaceBook'
            },
            {
                text: 'Disabled',
                disabled: false
            },
            {
                type: MenuItem.Types.LINK,
                payload: 'https://www.google.com',
                text: 'Disabled Link',
                disabled: true
            },
            {
                type: MenuItem.Types.SUBHEADER,
                text: <TextField hintText="Search" fullWidth={true}/>
            }
        ];




        let title = {
            padding:0,
            paddingLeft:7,
            margin:5,
            marginBottom:9,
            fontSize:25,
            textAlign:'left',
            letterSpacing:1.5,
            cursor:'point',
        };

        let starBtn = {
            width:1,
            display:'flex',
            alignItems:'flex-end'
        };

        let article = {
            display:'flex',
            alignItems:'center',
            margin:0,
            padding:0,
            fontSize:13,
            letterSpacing:1.5,
            color:'#656565',
        };

        let contents1={
            paddingRight:7,
            paddingLeft:7,
            margin:0,
            marginRight:7,
            marginLeft:7,
            lineHeight:1.5,
            textAlign:'left'
        };

        let contents2 = {
            paddingRight:7,
            paddingbottom:4,
            paddingLeft:7,
            paddingTop:4,
            margin:0,
            borderRight: 1,
            borderRightColor:'#656565',
            borderRightStyle:'solid',
            borderLeft: 1,
            borderLeftColor:'#656565',
            borderLeftStyle:'solid',
            lineHeight:1.5,
        };

        let contents3 = {
            paddingRight:7,
            paddingLeft:7,
            margin:0,
            borderRight: 1,
            borderRightColor:'#656565',
            borderRightStyle:'solid',
            lineHeight:1.5,
        };

        let contents4 = {
            margin:0,
            padding:0,
            size:50,
        };
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
        //<i className="material-icons">home</i>

        var articleList = this.props.articles.map((value)=>{
            return <ArticleTab
                    key={value.id}
                    data={value} />;
        }, this);


	    return (
    		<div  style={containerStyle}>
                <AppBar onLeftIconButtonTouchTap={this._leftmenu} title='CodePioneer'
                        iconElementRight={ <IconMenu iconButtonElement={<IconButton
                        iconClassName="material-icons" >expand_more</IconButton>}  >

                        <List >

                            <ListItem

                              leftAvatar={<Avatar  className="material-icons">stars</Avatar>}
                              primaryText="Latest news"
                               />
                            <ListDivider inset={true} />
                            <ListItem
                              leftAvatar={<Avatar  className="material-icons">favorite</Avatar>}
                              primaryText="Search"
                               />
                            <ListDivider inset={true} />
                            <ListItem
                              leftAvatar={<Avatar  className="material-icons">loyalty</Avatar>}
                              primaryText="be bo"
                               />
                        </List>
                                            </IconMenu> }
                />
                <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>


                <Paper zDepth={2}>

                    { articleList }

                </Paper>
            </div>
	    );

	},
    _leftmenu(){
        this.refs.leftNav.toggle();
    },
});

module.exports = container;