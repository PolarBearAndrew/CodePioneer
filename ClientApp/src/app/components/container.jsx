//要顯示的元件或是HTML元素寫在render的return裡面
//==========================================
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();
let MenuItem = mui.MenuItem;
let AppBar = mui.AppBar;
let LeftNav = mui.LeftNav;

let Paper = mui.Paper;
let FlatButton = mui.FlatButton;
let Avatar = mui.Avatar;
let CardHeader = mui.CardHeader;
let CardText = mui.CardText;
let IconButton = mui.IconButton;

let Checkbox = mui.Checkbox;
let ListItem = mui.ListItem;

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
            ];
        
        let article = {
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center',
            color:"#696969",
            padding:5
            
        };
        
        let title = {
            fontSize:30,
            padding:0,
            margin:0
        };
        
        let starBtn = {
            width:0,
            display:'flex',
            alignItems:'flex-end'
            
        };
        
        let contents = {
            padding:5
        };
        // iconClassNameRight="muidocs-icon-navigation-expand-more"
        //<i className="material-icons">home</i>
        
	    return (
    		<div  style={containerStyle}>
            
                <AppBar onRigthIconButtonTouchTap={this._leftmenu} title='CodePioneer' 
                        //右邊出現灰色底
                        iconElementRight={ <IconButton iconClassName="material-icons"> home </IconButton> }
                        />
                <br/>
            
                <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>
            
                <Paper zDepth={2}>
                    <ListItem 
                        style={title} 
                        onMouseOver = {this._onTitleOver}
                        className="title" 
                        primaryText="New JavaScript in 2015 !!" 
                        href=""
                    />
                    <div style={article}>
                      <CardText style={contents}>
                        by AndrewChen 
                <br/> In FaceBook
                      </CardText>
                      
                      <CardText style={contents}>
                        this is the world future...
                      </CardText>
            
                      <CardText className="comments" style={contents}>
                        999 likes
                      </CardText>
            
                      <Checkbox
                        style={starBtn}
                        name="checkboxName4"
                        value="checkboxValue4"
                        checkedIcon={<i className="material-icons">star</i>}
                        unCheckedIcon={<i className="material-icons">star_border</i>}
                        />
                    </div>
                </Paper>
            
            </div>
	    );

	},
    _leftmenu(){
        this.refs.leftNav.toggle();
      },
    
    _onTitleOver(){
    },
});

module.exports = container;