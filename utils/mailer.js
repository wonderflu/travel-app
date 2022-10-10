const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const {
  user,
  clientId,
  clientSecret,
  refreshToken,
  redirectUri,
} = require('../configs');

const OAuth2 = google.auth.OAuth2;

class SendEmail {
  async getAccessToken() {
    try {
      const oAuth2Client = new OAuth2(clientId, clientSecret, redirectUri);

      oAuth2Client.setCredentials({ refresh_token: refreshToken });
      const accessToken = await oAuth2Client.getAccessToken();

      return accessToken;
    } catch (err) {
      console.log(err);
    }
  }

  async createTransport() {
    try {
      const accessToken = await this.getAccessToken();
      const transport = nodemailer.createTransport({
        service: 'Gmail',
        secure: true,
        auth: {
          type: 'OAuth2',
          user,
          clientId,
          clientSecret,
          refreshToken,
          accessToken,
        },
      });

      return transport;
    } catch (err) {
      console.log(err);
    }
  }

  async sendMail(options) {
    try {
      const transport = await this.createTransport();
      await transport.verify();
      const result = await transport.sendMail(options);
      transport.close();

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new SendEmail();
