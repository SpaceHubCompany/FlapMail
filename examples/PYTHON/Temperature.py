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

token = FLAPMAIL_TOKEN.strip()
if not token or token == 'ms_replace_with_your_token':
    raise SystemExit('A token is required.')
ENDPOINT = 'https://app.flapmail.net/api/submit.php'
celsius = round(random.uniform(16.0, 34.0), 1)
fahrenheit = round((celsius * 9 / 5) + 32, 1)
payload = {
    'name': 'Temperature Bot',
    'email': 'temperature.bot@example.com',
    'message': f'<h2>Current Temperature</h2><p><strong>Celsius:</strong> {celsius} °C</p><p><strong>Fahrenheit:</strong> {fahrenheit} °F</p>',
    'token': token,
    # format can be 'html' or 'text'
    'format': 'html',
    'form_type': 'temperature_report'
}
encoded = urllib.parse.urlencode(payload).encode('utf-8')
request = urllib.request.Request(ENDPOINT, data=encoded, method='POST')
request.add_header('Content-Type', 'application/x-www-form-urlencoded')
request.add_header('User-Agent', 'FlapMail/1.0')
with urllib.request.urlopen(request, timeout=20) as response:
    print(response.read().decode('utf-8'))
