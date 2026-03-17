<?php
$success = '';
$error = '';
function isValidEmail($email) { return filter_var($email, FILTER_VALIDATE_EMAIL) !== false; }

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
        // format can be 'html' or 'text'
        $payload['format'] = 'html';

        $options = [
            'http' => [
                'header'  => "Content-Type: application/x-www-form-urlencoded
",
                'method'  => 'POST',
                'content' => http_build_query($payload),
                'timeout' => 20,
            ],
        ];
        $context = stream_context_create($options);
        $result = @file_get_contents($endpoint, false, $context);
        $data = $result ? json_decode($result, true) : null;
        if (is_array($data) && !empty($data['ok'])) { $success = 'Message sent successfully.'; }
        else { $error = is_array($data) && !empty($data['error']) ? $data['error'] : 'Unable to send the message.'; }

    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HR Form - FlapMail PHP Example</title>

  <style>
    body { font-family: Arial, sans-serif; background:#07111f; color:#eaf2ff; margin:0; padding:32px; }
    .card { max-width:820px; margin:0 auto; background:#0f1b31; border:1px solid #1d3a6d; border-radius:18px; padding:28px; box-shadow:0 18px 45px rgba(0,0,0,.35); }
    h1 { margin-top:0; color:#7fc1ff; }
    p { color:#bfd2ef; }
    label { display:block; margin-top:14px; font-weight:700; }
    input, select, textarea, button { width:100%; box-sizing:border-box; border-radius:12px; border:1px solid #2f4f87; background:#091427; color:#fff; padding:14px; margin-top:8px; }
    textarea { min-height:130px; resize:vertical; }
    button { background:linear-gradient(135deg,#0f4fff,#1a8dff); border:none; cursor:pointer; font-weight:700; }
    .note { font-size:13px; color:#9db6dd; }
    .status { margin-top:16px; padding:12px; border-radius:12px; display:none; }
    .ok { background:#11351f; color:#b8ffcb; display:block; }
    .err { background:#3f1515; color:#ffc3c3; display:block; }
  </style>

</head>
<body>
  <div class="card">
    <h1>HR Form</h1>
    <p>An HR intake form with dropdowns for role and work model.</p>
    <?php if ($success): ?><div class="status ok"><?php echo htmlspecialchars($success); ?></div><?php endif; ?>
    <?php if ($error): ?><div class="status err"><?php echo htmlspecialchars($error); ?></div><?php endif; ?>
    <form method="post" >

      <label for="name">Full Name</label><input id="name" name="name" required />
      <label for="email">Email</label><input id="email" name="email" type="email" required />
      <label for="position">Position of Interest</label><select id="position" name="position" required><option value="">Select one</option><option>Software Engineer</option><option>Product Manager</option><option>Designer</option><option>Support Specialist</option></select>
      <label for="work_model">Work Model</label><select id="work_model" name="work_model" required><option value="">Select one</option><option>On-site</option><option>Hybrid</option><option>Remote</option></select>
      <label for="linkedin">LinkedIn or Portfolio URL</label><input id="linkedin" name="linkedin" />
      <label for="message">Summary</label><textarea id="message" name="message" required></textarea>

      <button type="submit">Send</button>
    </form>
  </div>
</body>
</html>
