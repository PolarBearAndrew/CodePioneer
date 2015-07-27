
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();
let Paper = mui.Paper;
let CircularProgress = mui.CircularProgress;

//元件
let ListItem = require('./ListItem.jsx');

//flux
let actionsLike = require('../../actions/AppActions_like.jsx');

let ListContainer = React.createClass({

	getInitialState (){

        window.addEventListener("scroll", this._handleScroll);
        return null;
    },

    _handleScroll() {

    	window.removeEventListener("scroll", this._handleScroll);

        if(!this.props.list.isMoreData){
            return;
        }

        if(( document.body.scrollTop + screen.height ) >= document.body.scrollHeight + 40 ){

            let articlesList = this.props.list.data;

            setTimeout(()=>{
                this.props.list.loadmore( articlesList.length, articlesList[0].time );
            }, 200);

            setTimeout(()=>{
            	window.addEventListener("scroll", this._handleScroll);
            }, 700);

        }else{
        	window.addEventListener("scroll", this._handleScroll);
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

		var articleList = this.props.list.data.map((value)=>{
            return <ListItem
                    key={value.id}
                    data={value}
                    user={this.props.user}

                    like={actionsLike.like}
                    unlike={actionsLike.unlike}

                    filter={this.props.filter}
                    filterData={this.props.list.filter} />;
        }, this);

	    return (
            <div>

    	    	<Paper zDepth={2} id="listContainer">
    		        { articleList }
    		    </Paper>

                <CircularProgress mode="indeterminate" size={0.5}/>

            </div>
	    );

	},
});

module.exports = ListContainer;