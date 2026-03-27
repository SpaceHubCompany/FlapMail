# n8n-nodes-flapmail

Community node for sending messages through FlapMail.

## Credentials
- Base URL: `https://app.flapmail.net`
- Endpoint Path: `/api/submit.php`
- Token: your FlapMail token

## Exposed fields
- format
- name
- email
- subject
- category
- department
- message
- attachment (optional, from binary)
- additionalFieldsJson

## Install locally
```bash
npm install
npm run build
```

## Publish
Publish as an npm package named `n8n-nodes-flapmail`.
