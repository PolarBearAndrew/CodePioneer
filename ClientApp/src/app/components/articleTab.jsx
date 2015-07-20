
//步驟
//重新命名myName,命名成這個元件名稱,共有兩個地方需要修改
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

let ArticleTab = React.createClass({

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

        let data = this.props.data;

        console.log('new a article tab', data);

	    return (

	    	<Paper id={data.id} zDepth={1}>
                <p
                    style={title}
                    className="title"
                    >
                    <a href="http://material-ui.com/#/" >{ data.title }</a>
                </p>
                <div style={article} className="article">
                  <p style={contents1}>
                    by { data.author } <br/> On { data.from }
                  </p>
                  <p style={contents2}>
                  	{ data.describe }
                  </p>
                  <p style={contents3} className="comments">
                    { data.info[0] }
                  </p>
                  <div>
                    <Checkbox style={contents4}
                      name="checkboxName4"
                      value="checkboxValue4"
                      checkedIcon={<FontIcon color={Colors.cyan500} className="material-icons">star</FontIcon >}
                      unCheckedIcon={<FontIcon  className="material-icons">star_border</FontIcon >}
                    />
                  </div>
                </div>
            </Paper>
	    );

	},
});

module.exports = ArticleTab;