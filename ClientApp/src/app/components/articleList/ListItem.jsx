//react
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let Paper = mui.Paper;
let Avatar = mui.Avatar;
let Checkbox = mui.Checkbox;
let FontIcon = mui.FontIcon;
let Snackbar = mui.Snackbar;

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
            padding:'0px',
            paddingLeft:'7px',
            margin:'5px',
            marginTop:'5px',
            fontSize:'25px',
            textAlign:'left',
            letterSpacing:'1.5px',
            cursor:'point',
        };

        let articleAll = {
            display:'flex',
            alignItems:'center',
            marginBottom:'3px',
        };

        let article = {
            margin:'0px',
            padding:'0px',
            display:'flex',
            alignItems:'center',
            fontSize:'13px',
            letterSpacing:'1.5px',
            color:'#656565',
        };

        let contents1 = {
            margin:'0px',
            paddingRight:'7px',
            paddingLeft:'7px',
            marginRight:'7px',
            marginLeft:'7px',
            lineHeight:'1.5px',
            textAlign:'left'
        };

        let contents2 = {
            margin:'0px',
            paddingRight:'14px',
            paddingLeft:'7px',
            lineHeight:'1.5px',
        };

        let contents3 = {
            margin:'0px',
            padding:'0px',
            size:'50px',
        };

        let contents4 = {
            margin:'0px',
            marginLeft:'15px',
            padding:'0px',
            size:'50px',
        };

        let starPicPosi = {
            top: '-8px',
            left:'-7px',
            fontSize:　'40'
        };

        let starPosi = {
            star : { marginLeft: 'auto'},
            wrapper : { margin:'0px',width: '100%', marginBottom: '14px'},
        };

        let avatar = {
            maxWidth:'100%',
            height:'auto',
            minWidth:'40px',
            cursor: 'pointer',
        };

        let data = this.props.data;
        let ctrlStart = null;

        console.log('user.like', this.props.user.like);

        if(this.props.user.like.indexOf(data._id) !== -1){
            ctrlStart = true;
        }else{
            ctrlStart = false;
        }

        let zDepth = 1;
        let paperStyle = {};

        this.props.filterData.forEach( (value) => {
            if(value == data.from){
                zDepth = 3;
                paperStyle = {
                    marginTop:'12px',
                    marginBottom:'18px',
                };
            }
        });

        let likeImg = data.like
        .filter( val => {
            return val;
        })
        .map( (val, index) => {

            let avatarAuthor = null;

            if(index === 0){
                avatarAuthor = { marginLeft:'auto',};
            }

            return <Avatar style={avatarAuthor} src={val}  size={24}/>;
        });

	    return (
	    	<Paper id={data._id} key={data._id} zDepth={ zDepth } style={paperStyle}>
                <div style={articleAll}>
                    <Avatar style={avatar} src={ 'images/' + data.from + '.png' } onTouchTap={ this._filter } />
                    <div style={ starPosi.wrapper }>
                        <p  style={title}
                            className="title">
                            <a href={ data.url } > { data.title }</a></p>
                        <div style={article} className="article">
                          <p style={contents1}>
                            { data.author ? 'by ' + data.author : null }</p>
                          <p style={contents2} className="comments">
                            { data.info ? data.info[0] : null }</p>
                            { likeImg }
                        </div>
                    </div>
                    <div style={ starPosi.star }>
                        <Checkbox style={contents4 }
                            defaultChecked={ ctrlStart }
                            onCheck={this._like}
                            ref="star"
                            checkedIcon={<FontIcon color={Colors.yellow600}
                                            className="material-icons" style={starPicPosi}>star</FontIcon >}
                            unCheckedIcon={<FontIcon color={Colors.yellow600}
                                           className="material-icons" style={starPicPosi}>star_border</FontIcon >}/>
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
            this.props.like( this.props.user.id, this.props.data._id);
            this.refs.like.show();
            setTimeout( this.refs.like.dismiss, 2048 );
        }else{
            this.props.unlike( this.props.user.id, this.props.data._id);
            this.refs.unlike.show();
        }
    },

    _filter(){
        this.props.filter(this.props.data.from);
    },
});

module.exports = ArticleTab;