
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
let DropDownMenu=mui.DropDownMenu;
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

	render() {
            
         let All={
            //  textAlign:'left',
                padding: '0px',
                display: '-webkit-flex',
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
                marginTop:'20px',
         };
        
         let photo={
//              textAlign:'left',
                padding: '0px',
                display: '-webkit-flex',
                display:'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'row',
            };
        
          let image={
            margin:'0px',
            padding:'0px',
            marginTop:'60px'
            };
        
          let styles = {
              container: {
                  flexDirection: 'row',
                  textAlign: 'center',
                  margin:'0px',
                  marginBottom: '16px',
                  marginLeft:'100px',
                  },
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
               { text: 'Country', disabled: true   },
               { payload: '1', text: 'Taiwan' },
               { payload: '2', text: 'Japan' },
               { payload: '3', text: 'Korea ' },
               { payload: '4', text: 'America' },
            ];
            
            let country_width={
                width:'300px'
            };
        
	    return (
            <div style={All}>
	    	<div style={photo}>
                    <Avatar src="images/panda.png"  size={100}/>
                    
                    <IconButton style={image} iconClassName="material-icons" tooltipPosition="bottom-center" 
                        tooltip="Image Upload" >file_upload
                        <input type="file" id="imageButton" style={styles.exampleImageInput}/>
                    </IconButton>
            </div>
            
                    <br/>
                    <TextField
                		id="name"
                        hintText="Name"/>
                    <br/>
                    <DropDownMenu menuItems={country} style={country_width} selectedIndex={0} />
                    <br/><br/>
                    <TextField
                		id="skill"
                        hintText="Skill"
                        multiLine={true}/>
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
            </div>
	    );

	},
});

module.exports = userEdit;