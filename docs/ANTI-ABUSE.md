# Anti-Abuse Policy

FlapMail is a free transactional email delivery service for contact forms, website notifications, scripts, devices, and application alerts. It is not intended for newsletters, unsolicited messages, bulk email, or mass-marketing campaigns.

To protect service availability, recipient inboxes, and sender reputation, the submit API applies rate limits and automated anti-abuse controls.

## Current submit limits

The following limits are applied per token:

| Control | Current value | Behavior |
| --- | ---: | --- |
| Minimum interval between sends | 3 seconds | Consecutive requests using the same token must be at least 3 seconds apart. |
| Rate window | 5 minutes | The API counts successful sends during a rolling 5-minute period. |
| Maximum sends per window | 50 | The 51st request within the active 5-minute window is rejected. |
| Daily cap | 200 per token | Additional requests are rejected after 200 sends during the server's current calendar day. |
| Abuse-block duration | 60 minutes | Configured for future IP-based blocking, but not currently enforced by the submit endpoint. |

These values are managed by the service and may change when required to prevent abuse or maintain platform stability.

## Rate-limit responses

When an active rate limit is exceeded, the API returns:

```text
HTTP 429 Too Many Requests
```

The response body is JSON:

```json
{
  "ok": false,
  "error": "Please wait before sending again."
}
```

The minimum-interval response also includes a `retry_after` value:

```json
{
  "ok": false,
  "error": "Please wait 2s before sending again.",
  "retry_after": 2
}
```

Clients should wait for the requested period before retrying. Automated retry loops that immediately resend the same request may continue to receive `429` responses and may be treated as abusive traffic.

## Likely spam and bot detection

The API uses a honeypot field named `website`. This field should remain empty and hidden from normal users.

If an automated bot fills the honeypot field:

- the API returns `{"ok":true}`
- no email is sent
- the event is recorded as a probable automated submission

The successful response is intentional because it prevents bots from learning that their submission was detected.

The hosting environment may also reject requests that match suspicious patterns before they reach the FlapMail API. Such requests can receive an HTTP security error instead of the normal FlapMail JSON response.

## Abuse blocking status

The service configuration contains a 60-minute abuse-block duration. This value is reserved for future IP-based blocking on the submit endpoint.

At present, exceeding the send interval, rolling-window limit, or daily cap causes the individual request to be rejected, but it does not automatically create a 60-minute IP block through `api/submit.php`.

Active protections currently include:

- per-token minimum send interval
- per-token rolling-window limit
- per-token daily cap
- honeypot filtering
- hosting-level request security

## Attachment limitations

Attachments currently have the following restrictions:

- maximum size: 3 MB
- allowed extensions: `pdf`, `jpg`, `jpeg`, `png`, `txt`, `zip`, `doc`, `docx`, `xls`, and `xlsx`
- the detected file type must match an allowed type

Files that exceed the size limit or use a disallowed type are rejected before the email is sent.

## Recommended client behavior

- Treat HTTP `429` as a temporary rate-limit response.
- Read and display the JSON `error` value.
- Honor `retry_after` when it is provided.
- Avoid immediate or parallel retry loops.
- Keep tokens private whenever the application architecture allows it.
- Rotate a token if it is exposed or used unexpectedly.
- Do not use FlapMail for mailing lists or unsolicited campaigns.
