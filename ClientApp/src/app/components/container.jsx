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
let FlatButton = mui.FlatButton;
let Avatar = mui.Avatar;
let CardHeader = mui.CardHeader;
let CardText = mui.CardText;



let IconMenu=mui.IconMenu;
let List=mui.List;
let ListItem=mui.ListItem;
let ListDivider=mui.ListDivider;

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
              { type: MenuItem.Types.SUBHEADER, 
                text: <TextField hintText="Search" fullWidth={true}/> 
              },
            ];
        
        let article = {
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center'
        };
        
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
        //<i className="material-icons">home</i>
        
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
                    <div style={article}>
                      <FlatButton 
                        linkButton={true} 
                        href="https://github.com/callemall/material-ui" 
                        secondary={true} 
                        label="title_New Horizons phones home">                
                      </FlatButton>
            
                      <CardText>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                      </CardText>
                      <CardHeader
                        title="Panda"
                        subtitle="author"
                        avatar="http://lorempixel.com/100/100/nature/"/>
                    </div>
                    
                </Paper>
            </div>
	    );

	},
    _leftmenu(){
        this.refs.leftNav.toggle();
      },
});

module.exports = container;