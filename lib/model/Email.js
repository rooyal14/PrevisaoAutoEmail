const nodemailer = require('nodemailer');

class Email {
    constructor () {
        this.setMailConfig();
    }
    
    setMailConfig() {
        // Crita objeto transportador do nodemailer
        this.transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: 587,
            secure: false, // use SSL
            auth: {
                user: process.env.EMAIL_LOGIN,
                pass: process.env.EMAIL_PASSWORD,
            }
        });
        
    }

    // Configura conteudo do email a ser enviado de acordo com a formatação do nodemailer
    setContent(to, bcc, subject, content, attachments){
        this.mailOptions = {
            from: process.env.EMAIL_FROM,
            to: to,
            bcc: bcc,
            subject: subject,
            html: content,
            attachments: attachments
            // attachments: [
            //   {
            //       filename: 'previsaoTempoFiltro.pdf',
            //       path: ('previsaoTempoFiltro.pdf'),
            //       contentType: 'application/pdf'
            //   }
            // ]
        };
    }

    sendEmail() {
        const transporter = this.transporter;
        const mailOptions = this.mailOptions;

        transporter.sendMail(mailOptions, (error, info) => {
            error ? console.log('Error:', error) : console.log('Email sent:', info.response)
            });
    }
}

module.exports = Email;