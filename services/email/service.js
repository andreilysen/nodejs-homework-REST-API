const Mailgen = require("mailgen");

class EmailService {
  constructor(env, sender) {
    this.sender = sender;
    switch (env) {
      case "development":
        this.link = "https://e460-188-163-65-90.ngrok.io";
        break;
      case "production":
        this.link = "link for production";
        break;

      default:
        this.link = "http://127.0.0.1:3030";
        break;
    }
  }

  createTemplateEmail(name, verifyToken) {
    const mailGenerator = new Mailgen({
      theme: "salted",
      product: {
        name: "Encyclopedia of contacts",
        link: this.link,
      },
    });

    const email = {
      body: {
        name: "Guest",
        intro:
          "Welcome to Encyclopedia of contacts! We're very excited to have you on board.",
        action: {
          instructions:
            "To get started with Encyclopedia of contacts, please click here:",
          button: {
            color: "#22BC66",
            text: "Confirm your account",
            link: `${this.link}/api/users/verify/${verifyToken}`,
          },
        },
        outro:
          "Need help, or have questions? Just reply to this email, we'd love to help.",
      },
    };
    return mailGenerator.generate(email);
  }

  async sendVerifyEmail(email, name, verifyToken) {
    const emailHTML = this.createTemplateEmail(name, verifyToken);
    const msg = {
      to: email,
      subject: "Verify your email",
      html: emailHTML,
    };
    try {
      const result = await this.sender.send(msg);
      console.log(result);
      return true;
    } catch (error) {
      console.log(error.message);
      return false;
    }
  }
}

module.exports = EmailService;
