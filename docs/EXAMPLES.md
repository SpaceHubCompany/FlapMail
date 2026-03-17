# Examples Guide

This repository includes examples for the following languages:
- HTML
- PHP
- Node.js
- Java
- Python

## Form models included in every language

1. Simple Form
2. Request a Quote
3. I Need Help
4. HR Form

## Extra example in Python

5. Temperature notifier

The Python temperature example asks for a token at runtime, generates a random temperature, converts it to Celsius and Fahrenheit, and sends the result as an HTML email through FlapMail.

## Validation

Every form example validates the email field before sending.

## Endpoint used by all examples

```text
https://app.flapmail.net/api/submit.php
```

## Common payload fields

Typical fields used in the examples:
- token
- format
- name
- email
- subject-like fields such as category or department
- message

## Adapting examples

You can:
- rename fields
- add dropdowns
- add hidden fields
- send HTML content
- send plain text content

As long as your request is a valid POST to the FlapMail endpoint, the structure is flexible.
