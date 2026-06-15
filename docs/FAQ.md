# FAQ

## Does FlapMail work with any language?
Yes. If your stack can send an HTTP POST request, it can integrate with FlapMail.

## Do I need SMTP knowledge to start?
No. You can begin with FlapMail Service and move to your own SMTP later if needed.

## Can I use FlapMail in AI-generated websites?
Yes. FlapMail is easy to describe to AI builders and code assistants because the integration is simple and token-based.

## Can I use HTML emails?
Yes. Send `format=html` in your request.

## Can I use dropdown fields and custom fields?
Yes. The examples in this repo show both simple and structured forms.

## Can I send attached files?
Yes. The examples in this repository show how to send attached files. The current maximum attachment size is 3 MB.

## Where do I put my token?
Inside the token constant or variable in the example code. Search for the comment that tells you where to paste it.

## Is FlapMail intended for bulk email or marketing campaigns?
No. FlapMail is designed for transactional messages, contact forms, notifications, and application alerts. It must not be used as a bulk-email or spam relay.

## What are the current submit API limits?
Each token is currently limited to:

- one send every 3 seconds
- 50 sends within any 5-minute window
- 200 sends per calendar day

The service may adjust these values when necessary to protect availability and sender reputation.

## What happens when I exceed a limit?
The API rejects the request with HTTP `429 Too Many Requests` and returns a JSON error. For the minimum-interval limit, the response also includes `retry_after`, indicating how many seconds to wait.

Your application should display the returned message and wait before retrying. Do not immediately retry in a loop.

## Does FlapMail detect likely spam or automated submissions?
Yes. The API includes a honeypot field named `website`. Normal users should leave this field empty. If a bot fills it, the API returns a successful response but silently discards the message.

Requests may also be rejected by hosting-level security controls when they match suspicious request patterns.

## Is the 60-minute abuse block active?
Not yet on the submit endpoint. A 60-minute abuse-block duration is present in the service configuration, but it is currently reserved for future IP-based blocking. The active protections today are the 3-second interval, the 5-minute window, the daily token cap, honeypot filtering, and hosting-level security rules.

See [Service Limitations](LIMITATION.md) for the complete behavior.
