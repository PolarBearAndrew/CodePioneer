
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
        subject: '[CodePioneer] 密碼取回信件 Get your password!', //信件標題
        text: '密碼取回信件', // plaintext body  ??
        html: '<h1>Code Pioneer Service</h1><h4>密碼取回信件 Get your password!</h4><p>您的密碼是' // html body  內容 可以用html
    },

    this.sendTo = function( address, pwd ){

        this.mailOptions.to = address;
        this.mailOptions.html += pwd + '</p>';

        this.transporter.sendMail(this.mailOptions, function(error, info) {

            if (error) { return console.log(error); }
            else { console.log('send email to:', address) }
        });

    }.bind(this)
}

module.exports = postMan;
