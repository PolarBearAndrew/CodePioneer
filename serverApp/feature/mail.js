
function postMan (){

    this.nodemailer = require('nodemailer');

    // create reusable transporter object using SMTP transport
    this.transporter = this.nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'CodePioneerService@gmail.com',
            pass: 'panda123@'
        }
    });

    this.mailOptions = {
        from: '✔ Code Pioneer Service <CodePioneerService@gmail.com>', //寄件人
        to: '', //寄給誰
        subject: '[CodePioneer] 每日技術郵報 Tech today !!', //信件標題
        text: '每日技術郵報', // plaintext body  ??
        html: '<div style="background-color:#EEE;border-radius:12px;width:auto;margin:auto;"> <h1 style="text-align:center;font-Size:50px;padding-top:30px;margin-bottom:15px;font-family:sans-serif;color:grey">Code Pioneer</h1> <h2 style="text-align:left;margin-left:35px;margin-top:10px;color:rgb(222, 217, 81);display:inline">★</h2> <h2 style="text-align:left;margin-left:5px;display:inline;font-family:cursive;color:grey">EveryDay For New Article</h4> <hr size="5" align="center" noshade width="90%" color="#FFFFFF"> <p style="text-align:center;font-Size:40px;margin-top:10px;font-family:Microsoft JhengHei;color:grey">@title <div style="margin-left:35px;margin-bottom:35px;margin-right:35px;background-color:rgba(186, 187, 188, 0.4);border-radius:12px;color:grey"> <p style="font-Size:20px;font-family:Microsoft JhengHei;text-indent: 24pt;padding:20px">@content</p> </div> <div style="margin-left:35px;margin-right:35px;text-align:right;"> <h5 style="font-Size:15px;margin-right:10px;display:inline;color:grey">Code Pioneer敬上</h5> </div> </div>'
    },

    this.sendTo = function( address, pwd ){

      var data = {
        title: 'Reagent – JavaScript Testing Utilities for React (github.com)',
        content: 'Reagent is a JavaScript Testing utility for React that makes it easier to assert, manipulate, and traverse your React Components\' output. Reagent\'s API is meant to be intuitive and flexible by mimicking jQuery\'s API for DOM manipulation and traversal. Reagent is unopinionated regarding which test runner or assertion library you use, and should be compatible with all major test runners and assertion libraries out there. The documentation and examples for reagent use mocha and chai, but you should be able to extrapolate to your framework of choice.',
      };

      console.log('myEmail :', address);

      this.mailOptions.to = address;
      this.mailOptions.html = this.mailOptions.html.replace(/@title/, pwd ? '取回您的密碼' : data.title );
      this.mailOptions.html = this.mailOptions.html.replace(/@content/, pwd || data.content );

      this.transporter.sendMail(this.mailOptions, function(error, info) {
          if (error) { return console.log(error); }
          else { console.log('send email to:', address); }
      });

    }.bind(this);
}

module.exports = postMan;
