
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

//flux
let actionsLike = require('../actions/AppActions_like.jsx');

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

        let contents2 = {
            paddingRight:14,
            paddingLeft:7,
            paddingTop:4,
            margin:0,
            lineHeight:1.5,
        };

        let contents3 = {
            margin:0,
            padding:0,
            size:50,
        };

        let contents4 = {
            margin:0,
            padding:0,
            size:50,
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
        let ctrlStart = false;

        if( this.props.likes.indexOf( data._id ) !== -1  ){
            ctrlStart = true;
        }

	    return (

	    	<Paper id={data._id} zDepth={1}>
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
                            <Checkbox style={contents4 }
                                id={data.id}
                                name="checkboxName4"
                                value="checkboxValue4"
                                defaultChecked={ ctrlStart }
                                onCheck={this._like}
                                ref="star"
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

    _like (e, checked){

        if( checked ){
            actionsLike.addLike( this.props.user.id, this.props.data._id);
        }else{
            actionsLike.unLike( this.props.user.id, this.props.data._id);
        }

    }
});

module.exports = ArticleTab;