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
let CircularProgress=mui.CircularProgress;


//
let ArticleList = require('./articleList/ListContainer.jsx');
let UserList = require('./UserList/UserContainer.jsx');

//flux
let actionsArticle = require('../actions/AppActions_article.jsx');

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
	    	margin: '0px',
            paddingTop:'70px'
	    };

        var menuItems = [
            { route: 'user',
              text: <Avatar src="images/panda.png"/>,
              disabled: true
            },
            { route: 'news', text: 'News' },
            { route: 'follow', text: 'Follow' },
            { route: 'library', text: 'Library' },
            { route: 'setting', text: <div className="appear">Setting</div> },
            { route: 'logout', text: <div className="appear">Logout</div> },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { text: '', disabled: true },
            { type: MenuItem.Types.SUBHEADER,
              text: <TextField hintText="Search" fullWidth={true}/>
            }
        ];

        let fixed={
            top:0,
            right: 0,
            left: 0,
            width:'100%',
            height:'auto',
            position: 'fixed',

        };

        //<UserList />



	    return (
    		<div  style={containerStyle}>
                <AppBar title='CodePioneer'
                        style={fixed}
                        onLeftIconButtonTouchTap={this._leftmenu}
                        iconElementRight={
                                        <div className="comments">
                                            <IconMenu iconButtonElement={<IconButton
                                                                            iconClassName="material-icons" >
                                                                            person</IconButton>} >
                                                <List>
                                                    <ListItem
                                                      leftAvatar={<Avatar  className="material-icons">settings</Avatar>}
                                                      primaryText="Setting" />
                                                    <ListDivider inset={true} />
                                                    <ListItem
                                                      leftAvatar={<Avatar  className="material-icons">person_outline</Avatar>}
                                                      primaryText="Logout"/>
                                                    <ListDivider inset={true} />
                                                </List>
                                            </IconMenu>
                                        </div>} />
                <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>

                <ArticleList articles={this.props.articles}
                             user={this.props.user}
                             loadmore={actionsArticle.loadmore}
                             filter={actionsArticle.filter}
                             filterData={this.props.filterData}
                             isMoreData={this.props.isMoreData} />

            </div>
	    );

	},



    _leftmenu(){
        this.refs.leftNav.toggle();
    },
});

module.exports = container;