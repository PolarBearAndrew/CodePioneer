
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
        html: '<div style="background-color:#EEE;border-radius:12px;width:auto;margin:auto;"><h1 style="text-align:center;font-Size:50px;padding-top:30px;margin-bottom:15px;font-family:sans-serif;color:grey">Code Pioneer</h1><h2 style="text-align:left;margin-left:35px;margin-top:10px;color:rgb(222, 217, 81);display:inline">★</h2><h2 style="text-align:left;margin-left:5px;display:inline;font-family:cursive;color:grey">EveryDay For New Article</h4><hr size="5" align="center" noshade width="90%" color="#FFFFFF"><p style="text-align:center;font-Size:40px;margin-top:10px;font-family:Microsoft JhengHei;color:grey">Gmail 最新功能：拓展您的通信人脈網路<div style="margin-left:35px;margin-bottom:35px;margin-right:35px;background-color:rgba(186, 187, 188, 0.4);border-radius:12px;color:grey"><p style="font-Size:20px;font-family:Microsoft JhengHei;text-indent: 24pt;padding:20px">您是否遇過這種情況：想寫封電子郵件給某位認識的朋友，卻發現從未和對方交換過郵件地址？自本週起，Gmail 會在您寫信時，將您的 Google+ 人脈關係也納入收件者建議範圍當中，這樣一來，即使您尚未和對方交換過電子郵件地址，也可以寄信給對方。電子郵件地址的隱私保障為了保護電子郵件地址的私密性，向 Google+ 人脈關係中的聯絡人發信時，電子郵件地址的顯示方式跟平常略有不同。您向自己的 Google+ 人脈關係對象傳送電子郵件之後，對方才能看見您的電子郵件地址；您也必須等到對方回信，才看得見對方的電子郵件地址。接收社交圈外的使用者寄來的電子郵件如果您收到社交圈外的使用者寄來的電子郵件，該郵件會自動歸類到收件匣的「社交網路」類別中 (假設已啟用這項功能)，而且在您回覆對方或將對方加到您的社交圈之前，後續郵件不會開啟新的會話群組。如何設定可以聯絡您的對象您可以使用新的 Gmail 設定選項，藉此指定哪些人可以與您聯絡。如要瞭解詳情，請瀏覽我們的說明中心。</div><div style="margin-left:35px;margin-right:35px;text-align:right;"><h5 style="font-Size:15px;margin-right:10px;display:inline;color:grey">Code Pioneer敬上</h5></div></div>' 
        // html body  內容 可以用html
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
