import urllib.parse
import urllib.request
import re
import json
import mimetypes
import os
import random

ENDPOINT = 'https://app.flapmail.net/api/submit.php'
# Gere uma chave Token e coloque aqui
FLAPMAIL_TOKEN = 'ms_replace_with_your_token'


def is_valid_email(email: str) -> bool:
    return re.match(r'^[^\s@]+@[^\s@]+\.[^\s@]+$', email) is not None

payload = {'name': 'Alex Johnson', 'email': 'alex@example.com', 'position': 'Software Engineer', 'work_model': 'Remote', 'linkedin': 'https://www.linkedin.com/in/example', 'message': 'I would like to apply for this role.'}

if not is_valid_email(payload['email']):
    raise SystemExit('Please enter a valid email address.')

payload['token'] = FLAPMAIL_TOKEN
# format can be 'html' or 'text'
payload['format'] = 'html'

encoded = urllib.parse.urlencode(payload).encode('utf-8')
request = urllib.request.Request(ENDPOINT, data=encoded, method='POST')
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
with urllib.request.urlopen(request, timeout=20) as response:
    print(response.read().decode('utf-8'))
