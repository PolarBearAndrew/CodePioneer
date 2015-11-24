//react
let React = require('react');

//material 初始化(套件引入)
let mui = require('material-ui');
let Colors = mui.Styles.Colors;
let ThemeManager = new mui.Styles.ThemeManager();

//mui 元件
let Avatar = mui.Avatar;
let IconButton = mui.IconButton;
let TextField = mui.TextField;
let SelectField = mui.SelectField;

let userEdit = React.createClass({

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

    getInitialState() {
    return {
        selectValue: undefined,
			};
    },
	render() {

        let settingTitle = {
            margin:'0px',
            display: 'block',
            marginRight:'10px',
            marginBottom:'30px'
        };

         let image = {
             margin:'0px',
             padding:'0px',
             marginTop:'-25px',
         };

         let styles = {
             exampleImageInput: {
                cursor: 'pointer',
                position: 'absolute',
                top: '0',
                bottom: '0',
                right: '0',
                left: '0',
                width: '48px',
                opacity: '0'
                },
         };

         let country = [
               { payload: '1', text: 'Taiwan' },
               { payload: '2', text: 'Japan' },
               { payload: '3', text: 'Korea ' },
               { payload: '4', text: 'America' },
         ];

//          用來判斷rwd的另一種方法
        let screenWidth = document.body.scrollWidth;
        let ctrl = true;
        if(screenWidth <= 768 ){
            ctrl = false;
        };

				let user = this.props.user;

				console.log('user', this.props.user);

        return (
            <div className="editAll">
                <div className="editUp">
                        <Avatar src={ user.imgUrl }  size={100}/>
                        <IconButton style={image} iconClassName="material-icons" tooltipPosition="bottom-center"
                            tooltip="Image Upload" >file_upload
                            <input type="file" id="imageButton" style={styles.exampleImageInput}/>
                        </IconButton>

                    <br/><br/>

                    <div className="editNC">
                        <TextField
                            id="name"
                            hintText="Name"
														defaultValue={ user.name || 'AndrewChen'} />

                        <br/><br/>

                        <SelectField
                          valueMember={1}
                          onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
                          menuItems={country} />
                    </div>
                </div>
                <div className="editDown">
                        <br/>

                        <TextField
                            id="skill"
                            hintText="Skill"
                            multiLine={true}
														defaultValue='JavaScript, TDD'
                            fullWidth={ctrl}/>

                        <br/><br/>

                        <TextField
                            id="introduction"
                            hintText="Introduction"
														defaultValue='Hi, my name is Andrew...'
                            multiLine={true}
                            fullWidth={ctrl}/>
                </div>
            </div>
	    );
	},

  _handleSelectValueChange(name, e) {
    let change = {};
    change[name] = e.target.value;
    this.setState(change);
  },
});

module.exports = userEdit;
