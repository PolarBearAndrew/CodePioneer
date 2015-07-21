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

        console.log('this.props.user', this.props.user);

        var articleList = this.props.articles.map((value)=>{
            return <ArticleTab
                    key={value.id}
                    data={value}
                    user={this.props.user} />;
        }, this);


	    return (
    		<div  style={containerStyle}>
                <AppBar onLeftIconButtonTouchTap={this._leftmenu} title='CodePioneer'
                        iconElementRight={ <div className="comments"><IconMenu iconButtonElement={<IconButton
                        iconClassName="material-icons" >person</IconButton>}  >

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