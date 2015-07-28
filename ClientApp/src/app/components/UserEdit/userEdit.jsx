
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

let Avatar=mui.Avatar;
let IconButton=mui.IconButton;
let TextField=mui.TextField;
let SelectField=mui.SelectField;
//mui元件
//範例:
//let AppBar = mui.AppBar;

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
           }
    },
	render() {
            
//         let All={
//             margin:'0px',
//             padding: '0px',
//             display:'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'column',
//             marginTop:'20px',
//         };
        
//         let photo={
//             padding: '0px',
//             display:'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             flexDirection: 'row',
//         };
        
         let image={
             margin:'0px',
             padding:'0px',
             marginTop:'-25px',
//             marginLeft:'100px'
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
        
        
        
//        let tt={
//            width:'100px',
//        };
        
	    return (
            <div className="editAll">
                <div className="editUp">
                    <div className="editAI">
                        <Avatar src="images/panda.png"  size={100}/>
                        <IconButton style={image} iconClassName="material-icons" tooltipPosition="bottom-center" 
                            tooltip="Image Upload" >file_upload
                            <input type="file" id="imageButton" style={styles.exampleImageInput}/>
                        </IconButton>
                    </div>
                    <div className="editNC">
                        <TextField
                            id="name"
                            hintText="Name"/>
                        <br/>
                        <SelectField
                          value={this.state.selectValue}
                          onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
                          hintText="Country"
                          menuItems={country} />
                    </div>
                </div>
                <div className="editDown">
                        <TextField
                            id="skill"
                            hintText="Skill"
                            multiLine={true}
                            fullWidth={true}
                            />
                        <br/><br/>
                        <TextField
                            id="interest"
                            hintText="Interest"
                            multiLine={true}/>
                        <br/><br/>
                        <TextField
                            id="introduction"
                            hintText="Introduction"
                            multiLine={true}/>
                        <br/>
                        <textArea></textArea>
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