//要顯示的元件或是HTML元素寫在render的return裡面
//==========================================
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();
let MenuItem=mui.MenuItem;
let AppBar=mui.AppBar;
let LeftNav=mui.LeftNav;

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

	    return (
    		<div  style={containerStyle}>
                <AppBar onLeftIconButtonTouchTap={this._leftmenu} title='CodePioneer' 
                        //右邊出現灰色底
                        iconClassNameRight="muidocs-icon-navigation-expand-more"
           />
                <LeftNav docked={false} menuItems={menuItems} ref='leftNav'/>
            </div>
	    );

	},
    _leftmenu(){
    this.refs.leftNav.toggle();
  },
});

module.exports = container;