
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

let Paper = mui.Paper;
let Avatar = mui.Avatar;
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
//'px'

        let title = {
            padding:'0px',
            paddingLeft:'7px',
            margin:'5px',
            marginBottom:'9px',
            fontSize:'25px',
            textAlign:'left',
            letterSpacing:'1.5px',
            cursor:'point',
        };

        let articleAll = {
            display:'flex',
            alignItems:'center',
            marginBottom:'3px'
        };
        
        let article = {
            display:'flex',
            alignItems:'center',
            margin:'0px',
            padding:'0px',
            fontSize:'13px',
            letterSpacing:'1.5px',
            color:'#656565',
        };

        let contents1={
            paddingRight:'7px',
            paddingLeft:'7px',
            margin:'0px',
            marginRight:'7px',
            marginLeft:'7px',
            lineHeight:'1.5px',
            textAlign:'left'
        };

        let contents2 = {
            paddingRight:'14px',
            paddingLeft:'7px',
            paddingTop:'4px',
            margin:'0px',
            lineHeight:'1.5px',
        };

        let contents3 = {
            margin:'0px',
            padding:'0px',
            size:'50px',
        };

        let contents4 = {
            margin:'0px',
            padding:'0px',
            size:'50px',
        };
        
        let starTmp={
            left:'0px',
        };
        
        let A ={
            display:'flex',
            justifyContent:'flex-end',
            
        };
        
        let avatar={
            maxWidth:'100%',
            height:'auto',
            minWidth:'40px'
        };
       
        let data = this.props.data;

	    return (

	    	<Paper id={data.id} zDepth={1}>
                <div style={articleAll}>
                    <Avatar style={avatar} src="http://lorempixel.com/100/100/nature/" />
                    <div>
                        <p
                            style={title}
                            className="title"
                            >
                            <a href="http://material-ui.com/#/" >{ data.title }</a>
                        </p>
                        <div style={article} className="article">
                          <p style={contents1}>
                            by { data.author } 
                          </p>
                          
                          <p style={contents2} className="comments">
                            { data.info[0] }
                          </p>
                          <div style={A}>
                            <Checkbox style={contents4}
                              name="checkboxName4"
                              value="checkboxValue4"
                              checkedIcon={<FontIcon color={Colors.cyan500} className="material-icons" style={starTmp}>star</FontIcon >}
                              unCheckedIcon={<FontIcon  className="material-icons" style={starTmp}>star_border</FontIcon >}
                            />
                          </div>
                        </div>
                    </div>
                </div>
            </Paper>
	    );

	},
});

module.exports = ArticleTab;