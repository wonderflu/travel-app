const { emailSubject } = require('../consts/emailSubject');

const templateList = {
  [emailSubject.RESET_PASSWORD]: {
    subject: 'Reset your account password',
    template: 'reset-password',
  },
};

module.exports = { templateList };
