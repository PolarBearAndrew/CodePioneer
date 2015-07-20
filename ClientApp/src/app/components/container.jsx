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

		let containerStyle = {
	    	textAlign: 'center',
	    	padding: '0px',
	    	margin: '0px'
	    };

        var menuItems = [
            { route: 'user',
                text: <div className="appear"><IconButton  iconClassName="material-icons" >account_circle</IconButton></div>
//             text: <div className="comments"><IconButton  iconClassName="material-icons" >favorite</IconButton></div>,                      
            },
            { route: 'latest news', text: 'Latest news' },
            { route: 'search', text: 'Search' },
            { route: 'components', text: 'Components' },
            { route: 'logout', text: <div className="appear">Logout</div> },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { type: MenuItem.Types.SUBHEADER,
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
        
        let articleAll = {
            display:'flex',
            alignItems:'center'
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
        
//        let contents2 = {
//            paddingRight:7,
//            paddingbottom:4,
//            paddingLeft:7,
//            paddingTop:4, 
//            margin:0,
//            lineHeight:1.5,
//        };
        
        let contents2 = {
            paddingRight:14,
            paddingLeft:7,
            margin:0,
            lineHeight:1.5,
        };
        
//        let contents3 = {
//            margin:0,
//            padding:0,
//            display:'flex',
//            alignItems:'center',
//            justifyContent:'flex-end'
//        };
        
        let starTmp={
            left:'0px',
           
        };
        
       let A ={
            display:'flex',
            justifyContent:'flex-end'
       }
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
        //<i className="material-icons">home</i>

	    return (
    		<div  style={containerStyle}>
            
                <AppBar className="comments" onLeftIconButtonTouchTap={this._leftmenu} title='CodePioneer'
                        iconElementRight={ <div className="comments"> <IconMenu iconButtonElement={<IconButton
                        iconClassName="material-icons" >person</IconButton>} >

                                <List>
                                    <ListItem
                                      leftAvatar={<Avatar  className="material-icons">settings</Avatar>}
                                      primaryText="Setting"
                                    />
                                    <ListDivider inset={true} />
                                    <ListItem
                                      leftAvatar={<Avatar  className="material-icons">person_outline</Avatar>}
                                      primaryText="Logout"
                                    />
                                    <ListDivider inset={true} />
                                </List>

                            </IconMenu>  
                        </div>}
                />
                <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>

            
                <Paper zDepth={2}>
                    <Paper zDepth={1}>
                        <div style={articleAll}>
                            <Avatar src="http://lorempixel.com/100/100/nature/" />
                            <div>
                                <p
                                    style={title}
                                    className="title"
                                    >
                                    <a href="http://material-ui.com/#/" >New JavaScript in 2015 !! </a>           
                                </p>
                                <div style={article} className="article">
                                  <p style={contents1}>
                                    by AndrewChen
                                  </p>
                                  <p style={contents2} className="comments">
                                    999 likes
                                  </p>
                                  <div style={A}>
                                    <Checkbox 
                                      name="checkboxName4"
                                      value="checkboxValue4"
                                      checkedIcon={<FontIcon color={Colors.cyan500} className="material-icons" style={starTmp} >star</FontIcon >}
                                      unCheckedIcon={<FontIcon  className="material-icons" style={starTmp} >star_border</FontIcon >}
                                    />
                                  </div>
                                </div>
                            </div>
                        </div>
                    </Paper>
                    
                    
                </Paper>
            
            </div>
	    );

	},
    _leftmenu(){
        this.refs.leftNav.toggle();
      },
});

module.exports = container;