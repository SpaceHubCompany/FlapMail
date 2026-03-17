const https = require('https');
const querystring = require('querystring');
const fs = require('fs');
const path = require('path');

const FLAPMAIL_ENDPOINT_HOST = 'app.flapmail.net';
const FLAPMAIL_ENDPOINT_PATH = '/api/submit.php';
// Gere uma chave Token e coloque aqui
const FLAPMAIL_TOKEN = 'ms_replace_with_your_token';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function postUrlEncoded(payload) {
  const postData = querystring.stringify(payload);
  const options = { hostname: FLAPMAIL_ENDPOINT_HOST, path: FLAPMAIL_ENDPOINT_PATH, method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': Buffer.byteLength(postData) } };
  const req = https.request(options, (res) => { let body = ''; res.on('data', (chunk) => body += chunk); res.on('end', () => console.log(body)); });
  req.on('error', (error) => console.error('Request failed:', error.message));
  req.write(postData); req.end();
}

const payload = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  message: 'Please review the attached file.',
  token: FLAPMAIL_TOKEN,
  form_type: 'docs'
};
const filePath = path.join(__dirname, 'sample_attachment.txt');
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, 'Sample file created for the FlapMail attachment example.');
}
if (!isValidEmail(payload.email)) {
  console.error('Please enter a valid email address.');
  process.exit(1);
}
const stats = fs.statSync(filePath);
if (stats.size > 3 * 1024 * 1024) {
  console.error('The selected file exceeds the 3 MB limit.');
  process.exit(1);
}
const boundary = '----FlapMailBoundary' + Date.now();
const fileName = path.basename(filePath);
const fileContent = fs.readFileSync(filePath);
const parts = [];
for (const [key, value] of Object.entries(payload)) {
  parts.push(Buffer.from(`--${boundary}
Content-Disposition: form-data; name="${key}"

${value}
`));
}
// format can be 'html' or 'text'
parts.push(Buffer.from(`--${boundary}
Content-Disposition: form-data; name="format"

html
`));
parts.push(Buffer.from(`--${boundary}
Content-Disposition: form-data; name="file"; filename="${fileName}"
Content-Type: application/octet-stream

`));
parts.push(fileContent);
parts.push(Buffer.from(`
--${boundary}--
`));
const body = Buffer.concat(parts);
const options = {
  hostname: FLAPMAIL_ENDPOINT_HOST,
  path: FLAPMAIL_ENDPOINT_PATH,
  method: 'POST',
  headers: {
    'Content-Type': `multipart/form-data; boundary=${boundary}`,
    'Content-Length': body.length
  }
};
const req = https.request(options, (res) => {
  let responseBody = '';
  res.on('data', (chunk) => responseBody += chunk);
  res.on('end', () => console.log(responseBody));
});
req.on('error', (error) => console.error('Request failed:', error.message));
req.write(body);
req.end();
