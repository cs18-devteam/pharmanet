const { google } = require('googleapis');
const readline = require('readline');

const CLIENT_ID = "1052181867195-90k2bm84n2pl60c2b77q3rijed7jubfs.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

const SCOPES = ['https://mail.google.com/'];

const authUrl = oAuth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: SCOPES,
  prompt: 'consent',
});

console.log('Authorize this app by visiting this URL:\n', authUrl);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('\nEnter the code from the page here: ', async (code) => {
  rl.close();
  const { tokens } = await oAuth2Client.getToken(code);
  console.log('\nYour tokens:\n', tokens);
});
