# How to Generate a Token

A FlapMail token connects your page, script, or application to one sender inside your dashboard.

## Step-by-step

1. Log in to FlapMail.
2. Open the dashboard.
3. Create a sender if you do not have one yet.
4. In the sender row, click **Generate Token**.
5. Copy the token.
6. Paste it into your code.

## Where the token goes

Each example in this repository contains a clearly marked token placeholder.

Look for a comment like this:

```js
// Gere uma chave Token e coloque aqui
```

or this:

```python
# Gere uma chave Token e coloque aqui
```

Replace the placeholder with your real token.

## Token usage example

```text
token=ms_xxxxxxxxxxxxxxxxxxxxxxxxx
```

## Important notes

- A token is linked to one sender.
- If you revoke or rotate the token, older integrations will stop working until updated.
- Regenerate tokens only when you really need a new credential.
