//react
let React = require('react');

//mui
let mui          = require('material-ui');
let Colors       = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//元件
let Paper            = mui.Paper;
let ListItem         = require('./ListItem.jsx');
let CircularProgress = mui.CircularProgress;

//flux
let actionsLike = require('../../actions/AppActions_like.jsx');

//debug
let debug         = require('debug')('app:article');
let ListContainer = React.createClass({

	getInitialState() {

			window.addEventListener("scroll", this._handleScroll);
			return null;
		},

		_handleScroll() {

			window.removeEventListener("scroll", this._handleScroll);

			if (!this.props.list.isMoreData) {
				return;
			}

			if ((document.body.scrollTop + screen.height) >= document.body.scrollHeight + 40) {

				let articlesList = this.props.list.data;

				setTimeout(() => {
					this.props.list.loadmore(articlesList.length, articlesList[0].time);
				}, 200);

				setTimeout(() => {
					window.addEventListener("scroll", this._handleScroll);
				}, 700);

			} else {
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

			debug('[props]', this.props);

			let data = this.props.list.data || [];

			var articleList = data.map((value, index) => {
				return <ListItem
					key = {
						index
					}
					data = {
						value
					}
					user = {
						this.props.user
					}

					like = {
						actionsLike.like
					}
					unlike = {
						actionsLike.unlike
					}

					filter = {
						this.props.filter
					}
					filterData = {
						this.props.list.filter
					}
				/>;
			}, this);

			/*let allTitle = {
				fontSize: '35px',
				letterSpacing: '4px',
				margin: '0px',
				padding: '0px',
				marginLeft: '10px',
				marginBottom: '8px',
				display: 'flex',
				flexDirection: 'row',
			};*/


			let textEnd = {
				width: '80px',
				height: '40px',
				textalign: 'center',
			};

			return ( 
				< div >
					< Paper zDepth = {2} id = "listContainer" > { articleList } < /Paper> 
					< img src = "./images/end.png" style = { textEnd } /> 
				< /div >
			);
		},
});

module.exports = ListContainer;