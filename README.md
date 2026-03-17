# FlapMail

FlapMail is a lightweight email delivery layer for websites, landing pages, internal tools, dashboards, and apps that need to send email notifications without rebuilding mail infrastructure every time.

It was designed to be easy for humans and AI-generated projects to adopt. If you use ChatGPT, OpenAI tools, Gemini, Grok, Claude, Copilot, or any other code assistant, you can simply ask:

> Build my website or app so it sends messages and notifications with FlapMail.

The integration pattern is straightforward:
- create an account
- create a sender
- generate a token
- submit form data to the FlapMail endpoint

## Why FlapMail

- Fast setup for contact forms and email notifications
- Works with FlapMail service mode or your own SMTP credentials
- Compatible with any language that can send an HTTP POST request
- Simple token-based integration
- Friendly for no-code, low-code, and AI-generated interfaces
- Ready-to-copy examples in HTML, PHP, Node.js, Java, and Python

## What FlapMail is for

Typical use cases:
- Contact forms
- Quote requests
- Help desk forms
- HR application forms
- Website lead capture
- Device or script notifications
- App alerts
- Backend-to-email workflows

## Repository structure

```text
FlapMail/
├─ README.md
├─ docs/
│  ├─ GETTING_STARTED.md
│  ├─ GENERATE_TOKEN.md
│  ├─ AI_PROMPTS.md
│  ├─ EXAMPLES.md
│  └─ FAQ.md
├─ examples/
│  ├─ HTML/
│  ├─ PHP/
│  ├─ Node/
│  ├─ JAVA/
│  └─ PYTHON/
└─ assets/
```

## Quick start

1. Sign up at the FlapMail platform.
2. Log in to your dashboard.
3. Create a sender.
4. Click **Generate Token**.
5. Copy the token.
6. Paste the token into one of the example projects in this repository.
7. Publish your page or run your app.

## FlapMail endpoint

Use the FlapMail submit endpoint in your examples and apps:

```text
https://app.flapmail.net/api/submit.php
```

## Request basics

Minimum fields:
- `token`
- your form fields such as `name`, `email`, `message`
- optional `format=html` when you want HTML email rendering

## Supported integration styles

- Plain HTML + JavaScript
- PHP websites
- Node.js / Express
- Java apps
- Python scripts
- Any backend or frontend that can post form data

## Example prompt for AI builders

```text
Create a responsive contact page in English and connect the submit action to FlapMail.
Use token-based delivery.
Validate the email before submit.
Send the payload to https://app.flapmail.net/api/submit.php.
Keep the token in a clearly marked constant.
```

## Included examples

This repository ships with more than 5 ready-to-adapt examples:
- Simple Form
- Request a Quote
- I Need Help
- HR Form
- Python Temperature notifier

See the `examples` folder for all language-specific files.

## Notes for developers

- Replace the token placeholder before publishing.
- Keep tokens private in production apps.
- Prefer server-side use when your architecture allows it.
- For browser-only pages, use HTTPS and only embed the token in trusted environments.

## Documentation

- [Getting Started](docs/GETTING_STARTED.md)
- [Generate Token](docs/GENERATE_TOKEN.md)
- [Examples Guide](docs/EXAMPLES.md)
- [AI Integration Prompts](docs/AI_PROMPTS.md)
- [FAQ](docs/FAQ.md)
