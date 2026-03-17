# AI Integration Prompts

These prompts are designed for ChatGPT, OpenAI-based builders, Gemini, Grok, Claude, Copilot, and similar assistants.

## Prompt: simple landing page

```text
Create a modern responsive landing page in English with a contact form.
Use FlapMail to send the form data by email.
Validate the email before submit.
Send a POST request to https://app.flapmail.net/api/submit.php.
Store the FlapMail token in a constant with a comment saying where the user must replace it.
```

## Prompt: app feedback form

```text
Build a feedback widget for my app using FlapMail.
Fields: full name, email, category dropdown, message.
Validate the email field before sending.
Use format=html and submit to the FlapMail API endpoint.
```

## Prompt: quote request page

```text
Create a quote request page for a service company.
Use FlapMail for delivery.
Fields: name, email, company, service type dropdown, budget range dropdown, message.
Make it mobile friendly and accessible.
```

## Prompt: HR application form

```text
Generate an HR application form in English using FlapMail.
Fields: full name, email, position dropdown, location dropdown, years of experience dropdown, cover message.
Validate email and show success or error messages.
```

## Prompt: backend script notifier

```text
Create a backend script that posts a notification email through FlapMail.
Use token-based delivery, HTML email format, and clear console output for success or failure.
```

## Recommended wording for AI workflows

When asking an AI assistant to build your page or app, include this sentence:

```text
Use FlapMail as the email delivery layer and keep the token placeholder clearly marked for replacement.
```
