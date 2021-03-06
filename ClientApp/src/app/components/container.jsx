//react
let React = require('react');

//material 初始化(套件引入)
let mui          = require('material-ui');
let Colors       = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let List        = mui.List;
let AppBar      = mui.AppBar;
let Avatar      = mui.Avatar;
let LeftNav     = mui.LeftNav;
let MenuItem    = mui.MenuItem;
let IconMenu    = mui.IconMenu;
let ListItem    = mui.ListItem;
let TextField   = mui.TextField;
let IconButton  = mui.IconButton;
let ListDivider = mui.ListDivider;

//debug
let debug = require('debug')('app:container');

//components
let UserList    = require('./UserList/UserContainer.jsx');
let UserEdit    = require('./UserEdit/userEdit.jsx');
let ArticleList = require('./articleList/ListContainer.jsx');

//flux - action
let actionsUsers   = require('../actions/AppActions_User.jsx');
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

    debug('[props]', this.props);

		let containerStyle = {
			textAlign: 'center',
			padding: '0px',
			margin: '0px',
			paddingTop:'70px'
	  };

		//left nav components
		let icon    = () => { return <Avatar src="images/panda.png"/>; }();
		let logout  = () => { return <div className="appear">Logout</div>; }();
		let search  = () => { return <TextField hintText="Search" fullWidth={true}/>; }();
		let setting = () => { return <div className="appear">Setting</div>; }();

		var menuItems = [
			{ route: 'user',
				text: icon,
				disabled: true
			},
			{ route: 'ArticleList', text: 'News' },
			{ route: 'Follow', text: 'Follow' },
			{ route: 'Library', text: 'Library' },
			{ route: 'Pioneer', text: 'Pioneer Library' },
			{ route: 'Setting', text: setting },
			{ route: 'logout', text: logout },
			{ text: '', disabled: true },
			{ text: '', disabled: true },
			{ text: '', disabled: true },
			{ text: '', disabled: true },
			{ text: '', disabled: true },
			{ text: search } //type: MenuItem.Types.SUBHEADER,
		];

		let fixed = {
			top:0,
			right: 0,
			left: 0,
			width:'100%',
			height:'auto',
			position: 'fixed',
		};

		let followTitle = {
			fontSize: '35px',
			letterSpacing: '4px',
			margin: '0px',
			padding: '0px',
			marginBottom: '7px',
			display: 'flex',
			alignItems: 'center',
			justifyContent: 'center',
			fontfamily: 'Ubuntu, serif',
		};
																							
		if(this.props.display == 'ArticleList'){
			this.props.display = 'News';
		}else if(this.props.display == 'Setting'){
			this.props.display = 'Setting';
		}else if(this.props.display == 'Pioneer'){
			this.props.display = 'Pioneer Library';
		}

    console.log('this.props.setting', this.props.setting)

		return (
			<div  style={containerStyle}>
				<AppBar title='CodePioneer'
					style={fixed}
					onLeftIconButtonTouchTap={this._leftmenu}
					iconElementRight={
						<div className="comments">
							<IconMenu iconButtonElement={<IconButton
																							iconClassName="material-icons">
																							person</IconButton>} >
									<List>
										<ListItem
											leftAvatar={<Avatar  className="material-icons">settings</Avatar>}
											onTouchTap={ this._setting }
											primaryText="Setting" />
										<ListDivider inset={true} />
										<ListItem
											leftAvatar={<Avatar  className="material-icons">person_outline</Avatar>}
											primaryText="Logout"/>
										<ListDivider inset={true} />
									</List>
							</IconMenu>
						</div>} />

					<p style={followTitle} className="title">{ this.props.display }</p>

					<LeftNav docked={false}
					 menuItems={menuItems}
					 onChange={this._navClick}
					 ref='leftNav'/>
						{ this.props.setting ? <UserEdit user={this.props.user} /> : null }
						{ this.props.list && ! this.props.setting ?
							<ArticleList user={this.props.user}
							 list={this.props.list}
							 filter={actionsArticle.filter} /> : <UserList user={this.props.user}
								 filter={actionsArticle.filter}
								 userList={this.props.userList}
								 helike={this.props.helike} /> }
			</div>
		);
	},

  _leftmenu(){
		this.refs.leftNav.toggle();
  },

  _navClick( e, selectedIndex, menuItem){
		//console.log('nav click',e, selectedIndex, menuItem);
		actionsUsers.changeDisplay(menuItem.route);
  },

  _setting(){
		actionsUsers.changeDisplay('Setting');
  }
});

module.exports = container;