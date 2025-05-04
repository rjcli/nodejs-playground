const nodemailer = require('nodemailer');
const pug = require('pug');
const htmlToText = require('html-to-text');

// Example use: new Email(user, url).sendWelcome();
module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Rashmi Raj <${global.process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (global.process.env.NODE_ENV === 'production') {
      // Sendgrid
      return 1;
    }
    return nodemailer.createTransport({
      host: global.process.env.MAILTRAP_HOST,
      port: global.process.env.MAILTRAP_PORT,
      auth: {
        user: global.process.env.MAILTRAP_USERNAME,
        pass: global.process.env.MAILTRAP_PASSWORD,
      },
    });
  }

  // Send the actual email
  async send(template, subject) {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    // 3) Create a transport and send email
    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('Welcome', 'Welcome to the Natours Family');
  }
};
