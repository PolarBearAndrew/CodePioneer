
//react
let React = require('react');

//mui
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

let Checkbox = mui.Checkbox;
let FontIcon = mui.FontIcon;
let Paper = mui.Paper;
let Avatar = mui.Avatar;
let IconButton=mui.IconButton;
let Dialog=mui.Dialog;
let TextField=mui.TextField;
//debug
let debug = require('debug')('app:user');


let userItem = React.createClass({

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

//        let pic={
//            display:'flex',
//            flexDirection:'row',
//            justifyContent:'center',
//            alignItems:'center',
//        };
        let avatar = {
            margin:'0px',
            marginTop:'15px',
        };

        let follow={
            left: '-7px',
            top:'-8px',
            fontSize:'40px',
        };

        let checkbox={
            margin:'0px',
            padding:'0px',
            marginBottom:'15px',
            marginLeft:'280px',
            width:'25px',
        };

        let info ={
            padding:'0px',
            margin:'0px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'flex-start',
            alignItems:'flex-start',
//            marginTop:'8px',
        };
        
        let more={
            margin:'0px',
            padding:'0px',
            marginLeft:'200px'
        };

        let data = this.props.data;

        let ctrlStart = null;

        if(data.follow.indexOf(this.props.user.id) !== -1){
            ctrlStart = true;
        }else{
            ctrlStart = false;
        }

        if(data._id === this.props.user.id)
            return null;


	    return (
	    	<Paper className="paperCard" zDepth={1} key={ this.props.key } >
                    <Avatar style={avatar} size={70} src={ data.imgUrl }  onTouchTap={this._showLike}/>
                    <div style={info} className="article">
                        <p className="infoContent">{ data.name } </p>
                        <p className="infoContent">Skill</p>
                        <p className="infoContent">最後登入時間： { data.lastLoginTime }</p>
                        <IconButton style={more} iconClassName="material-icons" tooltipPosition="bottom-center" 
                        tooltip="more.." onTouchTap={this._Profiles}>more_horiz</IconButton>
                        <Checkbox
                                style={checkbox}
                                onCheck={this._like}
                                defaultChecked={ ctrlStart }
                                checkedIcon={<FontIcon  className="material-icons" style={follow}
                                color={Colors.pink500}>star</FontIcon>}
                                unCheckedIcon={<FontIcon className="material-icons" style={follow}
                                color={Colors.pink500}>star_border</FontIcon>} />
                    </div>
            
            
            
                    <Dialog
			        title="Profiles"
			        actions={[
                        { text: 'sure', onTouchTap: this._onSingupSubmit, ref: 'submit' } ]}
                    actionFocus="submit"
			        ref="ProfilesDialog">
                    <TextField
                        defaultValue={data.name}
                        disabled={false} />
                    <br/>
                    <TextField
                        defaultValue="Taiwan"
                        disabled={false} />
                    <br/>
                    <TextField
                        defaultValue={ data.lastLoginTime }
                        disabled={false} />
                    <br/>
                    <TextField
                        defaultValue="Skill"
                        disabled={false} />
                    <br/>
                    <TextField
                        defaultValue="Interest"
                        disabled={false} />
                    <br/>
                    <TextField
                        defaultValue="Introduction"
                        disabled={false} />
                    <br/>
		        </Dialog>
            </Paper>
	    );

	},

    _showLike(){
        console.log('show like');
    },

    _like( e, checked){
        if( checked )
            this.props.follow(this.props.user.id, this.props.data._id);
        else
            this.props.unfollow(this.props.user.id, this.props.data._id);
    },
    _Profiles(){
   	    this.refs.ProfilesDialog.show();
    },
});

module.exports = userItem;