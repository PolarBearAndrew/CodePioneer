/**
 *
 */




var MainApp = React.createClass({

    mixins: [],

    getDefaultProps: function() {
        return;
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        return true;
    },


    render: function() {

        var mui = require('material-ui'),
          ThemeManager = new mui.Styles.ThemeManager(),
          RaisedButton = mui.RaisedButton;


        return (
			<div className="wrapper">
                 <RaisedButton label="Default" />
            </div>
        )
    },
});




module.exports = MainApp;
