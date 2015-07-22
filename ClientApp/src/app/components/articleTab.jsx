
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
let Checkbox=mui.Checkbox;
let FontIcon = mui.FontIcon;
let Snackbar = mui.Snackbar;

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
            top: '-8px',
            left:'-7px',
            fontSize:　'40'
        };

        let starPosi = {
            star : { marginLeft: 'auto'},
            wrapper : { width: '100%', marginBottom: '14px' }
        }

        let avatar={
            maxWidth:'100%',
            height:'auto',
            minWidth:'40px'
        };

        let data = this.props.data;
        let ctrlStart = false;

        this.props.user.like.forEach( (value) => {
            if(value.aid === data._id)
                ctrlStart = true;
        });
        
	    return (

	    	<Paper id={data._id} zDepth={1}>
                <div style={articleAll}>
                    <Avatar style={avatar} src={ 'images/' + data.from + '.png' } />
                    <div style={ starPosi.wrapper }>
                        <p
                            style={title}
                            className="title"
                            >
                            <a href={ data.url } > { data.title }</a>
                        </p>
                        <div style={article} className="article">
                          <p style={contents1}>
                            by { data.author }
                          </p>

                          <p style={contents2} className="comments">
                            { data.info[0] }
                          </p>
                        </div>
                    </div>
                    <div style={ starPosi.star }>
                            <Checkbox style={contents4 }
                                // name="checkboxName4"
                                // value="checkboxValue4"
                                defaultChecked={ ctrlStart }
                                onCheck={this._like}
                                ref="star"
                                checkedIcon={<FontIcon color={Colors.yellow600} className="material-icons" style={starTmp}>star</FontIcon >}
                                unCheckedIcon={<FontIcon color={Colors.yellow600}
                                               className="material-icons" style={starTmp}>star_border</FontIcon >}
                            />
                    </div>
                </div>

                <Snackbar
                      ref="like"
                      action="like"
                      message={ data.title } />
                <Snackbar
                      ref="unlike"
                      action="unlike"
                      message={ data.title } />
            </Paper>
	    );

	},

    _like (e, checked){

        if( checked ){
            actionsLike.addLike( this.props.user.id, this.props.data._id);
            this.refs.like.message = '123123123';
            this.refs.like.show();


            setTimeout( this.refs.like.dismiss, 2048 );

        }else{
            actionsLike.unLike( this.props.user.id, this.props.data._id);
            this.refs.unlike.show();
        }

    }
});

module.exports = ArticleTab;