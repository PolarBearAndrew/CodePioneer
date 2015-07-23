
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();
let Paper = mui.Paper;

//元件
let ListItem = require('./ListItem.jsx');

//flux
let actionsLike = require('../../actions/AppActions_like.jsx');

//ctrl
let isNotLoading = true;

let ListContainer = React.createClass({

	getInitialState:function(){

        window.addEventListener("scroll", this._handleScroll);
        return null;
    },

    _handleScroll() {


        if( isNotLoading && ( document.body.scrollTop + document.body.clientHeight ) >= document.body.scrollHeight ){

	        isNotLoading = false;

            console.log('loading more...');

            let articlesList = this.props.articles;

            setTimeout(()=>{
                this.props.loadmore( articlesList.length, articlesList[0].time );
            }, 200);

            setTimeout(()=>{
                isNotLoading = true;
            }, 500);

        }
    },

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

		isNotLoading = true;

		var articleList = this.props.articles.map((value)=>{
            return <ListItem
                    key={value.id}
                    data={value}
                    user={this.props.user}
                    like={actionsLike.like}
                    unlike={actionsLike.unlike} />;
        }, this);

	    return (

	    	<Paper zDepth={2}>
		        { articleList }
		    </Paper>
	    );

	},
});

module.exports = ListContainer;