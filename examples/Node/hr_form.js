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
  "name": "Alex Johnson",
  "email": "alex@example.com",
  "position": "Software Engineer",
  "work_model": "Remote",
  "linkedin": "https://www.linkedin.com/in/example",
  "message": "I would like to apply for this role."
};

if (!isValidEmail(payload.email)) {
  console.error('Please enter a valid email address.');
  process.exit(1);
}

payload.token = FLAPMAIL_TOKEN;
// format can be 'html' or 'text'
payload.format = 'html';

postUrlEncoded(payload);
