const EmailTemplates = require('email-templates');
const { user } = require('../configs');
const CustomHTTPError = require('./error');
const { templateList } = require('../emails/index');
const mailer = require('./mailer');

const emailTemplates = new EmailTemplates();

class EmailService {
  constructor(email, subject, text) {
    this.email = email;
    this.subject = subject;
    this.text = text;
  }

  async SendEmail(email, subject, text = {}) {
    const templateToSend = templateList[subject];

    if (!templateToSend) {
      throw CustomHTTPError.BadRequest(TEMPLATE_NOT_FOUND);
    }

    const html = await emailTemplates.render(templateToSend.template, text);

    await mailer.sendMail({
      from: `Nataha Tour <${user}>`,
      to: email,
      subject: templateToSend.subject,
      html,
    });
  }
}

module.exports = new EmailService();
