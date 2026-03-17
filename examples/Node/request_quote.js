const https = require('https');
const querystring = require('querystring');

const FLAPMAIL_ENDPOINT_HOST = 'app.flapmail.net';
const FLAPMAIL_ENDPOINT_PATH = '/api/submit.php';
// Gere uma chave Token e coloque aqui
const FLAPMAIL_TOKEN = 'ms_replace_with_your_token';

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

const payload = {'name': 'Alex Johnson', 'email': 'alex@example.com', 'company': 'Northwind Labs', 'service': 'Website Development', 'budget': '$1,000 - $5,000', 'message': 'I would like a quote for a responsive website.'};

if (!isValidEmail(payload.email)) {
  console.error('Please enter a valid email address.');
  process.exit(1);
}

payload.token = FLAPMAIL_TOKEN;
payload.format = 'html';

const postData = querystring.stringify(payload);

const options = {
  hostname: FLAPMAIL_ENDPOINT_HOST,
  path: FLAPMAIL_ENDPOINT_PATH,
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    try {
      const data = JSON.parse(body);
      if (res.statusCode >= 200 && res.statusCode < 300 && data.ok) {
        console.log('Message sent successfully.');
      } else {
        console.error('FlapMail error:', data.error || body);
      }
    } catch (error) {
      console.error('Invalid response:', body);
    }
  });
});

req.on('error', (error) => {
  console.error('Request failed:', error.message);
});

req.write(postData);
req.end();
