# Getting Started

This guide shows how to create your FlapMail account, create a sender, and prepare your first integration.

## 1. Create your account

1. Open the FlapMail platform.
2. Click **Sign up**.
3. Enter your email address, and click send Token.
4. Enter the token you received on e-mail 
5. Click Enter to Log in.

## 2. Open the dashboard

After login, you will land on the FlapMail dashboard.

From there, you can:
- create senders
- generate tokens
- review recent activity
- track performance

## 3. Create your first sender

1. Click **New Sender**.
2. Choose one of the available service types:
   - **FlapMail Service**: easier setup using the FlapMail delivery structure
   - **Own SMTP Service**: use your own SMTP credentials
3. Enter the sender name.
4. Save the sender.

### FlapMail Service

When using FlapMail Service:
- the email is sent through the FlapMail structure
- the message sender address is typically `noreply@flapmail.net`
- your account email is used as the destination that receives leads

### Own SMTP Service

When using Own SMTP Service:
- you provide your own SMTP host, port, security mode, username, and password
- your account email remains the destination that receives leads
- this is useful when you need to send from your own mail server

## 4. Generate a token

1. Find your sender in the sender list.
2. Click **Generate Token**.
3. Copy the generated token.
4. Paste it into your website, app, or one of the examples in this repository.

## 5. Test the integration

Use one of the examples in the `examples` folder and replace the placeholder token with your real token.

## 6. Publish

After your test succeeds, publish your page or deploy your app.

## Best practices

- keep your token out of public repos
- rotate tokens when needed
- use a backend whenever you need stricter control
- validate email fields before submit
- log success and error responses in your app
