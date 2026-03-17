<?php
$success = '';
$error = '';

function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $endpoint = 'https://app.flapmail.net/api/submit.php';
    // Gere uma chave Token e coloque aqui
    $token = 'ms_replace_with_your_token';

    $email = trim($_POST['email'] ?? '');
    if (!isValidEmail($email)) {
        $error = 'Please enter a valid email address.';
    } else {
        $payload = $_POST;
        $payload['token'] = $token;
        $payload['format'] = 'html';

        $options = [
            'http' => [
                'header'  => "Content-Type: application/x-www-form-urlencoded\r\n",
                'method'  => 'POST',
                'content' => http_build_query($payload),
                'timeout' => 20,
            ],
        ];

        $context = stream_context_create($options);
        $result = @file_get_contents($endpoint, false, $context);
        $data = $result ? json_decode($result, true) : null;

        if (is_array($data) && !empty($data['ok'])) {
            $success = 'Message sent successfully.';
        } else {
            $error = is_array($data) && !empty($data['error']) ? $data['error'] : 'Unable to send the message.';
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>I Need Help - FlapMail PHP Example</title>
  <style>
    body { font-family: Arial, sans-serif; background:#0b1220; color:#eaf2ff; padding:32px; }
    .card { max-width:760px; margin:0 auto; background:#111a2e; border:1px solid #1f3158; border-radius:18px; padding:28px; }
    input, select, textarea, button { width:100%; box-sizing:border-box; margin-top:8px; margin-bottom:12px; padding:14px; border-radius:12px; border:1px solid #2f487f; background:#0a1325; color:#fff; }
    button { background:#0f4fff; border:none; font-weight:700; cursor:pointer; }
    .ok { background:#11351f; color:#b8ffcb; padding:12px; border-radius:12px; }
    .err { background:#3f1515; color:#ffc3c3; padding:12px; border-radius:12px; }
  </style>
</head>
<body>
  <div class="card">
    <h1>I Need Help</h1>
    <p>A support-style form with a category dropdown.</p>
    <?php if ($success): ?><div class="ok"><?php echo htmlspecialchars($success); ?></div><?php endif; ?>
    <?php if ($error): ?><div class="err"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
    <form method="post">

<label for="name">Full Name</label>
<input id="name" name="name" required />
<label for="email">Email</label>
<input id="email" name="email" type="email" required />
<label for="category">Help Category</label>
<select id="category" name="category" required>
  <option value="">Select one</option>
  <option>Technical Issue</option>
  <option>Billing</option>
  <option>Account Access</option>
  <option>General Question</option>
</select>
<label for="priority">Priority</label>
<select id="priority" name="priority" required>
  <option value="">Select one</option>
  <option>Low</option>
  <option>Medium</option>
  <option>High</option>
</select>
<label for="message">How can we help?</label>
<textarea id="message" name="message" required></textarea>

      <button type="submit">Send</button>
    </form>
  </div>
</body>
</html>
