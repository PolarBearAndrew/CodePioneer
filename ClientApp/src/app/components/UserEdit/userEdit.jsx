
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
        let title={
            fontSize:'30px',
        };
        
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
//          用來判斷rwd的另一種方法
        
//        let screenWidth = screen.width;
        let screenWidth = document.body.scrollWidth;
        let ctrl = true;
        
        if(screenWidth <= 768 ){
            ctrl = false;
        };
        
        let textArea={
            width:'250px',
            height:'100px'
        };
        return (
            <div className="editAll">
            <p style={title} className="title">Edit profile</p>
                <div className="editUp">
                    <div className="editAI">
                        <Avatar src="images/default.png"  size={100}/>
                        <IconButton style={image} iconClassName="material-icons" tooltipPosition="bottom-center" 
                            tooltip="Image Upload" >file_upload
                            <input type="file" id="imageButton" style={styles.exampleImageInput}/>
                        </IconButton>
                    </div>
                    <br/><br/>
                    <div className="editNC">
                        <TextField
                            id="name"
                            hintText="Name" />
                        <br/><br/>
                        <SelectField
                          value={this.state.selectValue}
                          onChange={this._handleSelectValueChange.bind(null, 'selectValue')}
                          hintText="Country"
                          menuItems={country} />
                    </div>
                </div>
                <div className="editDown">
                        <br/>
                        <TextField
                            id="skill"
                            hintText="Skill"
                            multiLine={true}
                            fullWidth={ctrl}/>
                        <br/><br/>
                        <TextField
                            id="introduction"
                            hintText="Introduction"
                            multiLine={true}
                            fullWidth={ctrl}/>   
                        <br/><br/>
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