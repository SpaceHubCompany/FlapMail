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

def build_multipart(fields: dict, file_field: str, file_path: str):
    boundary = '----FlapMailBoundaryPython'
    lines = []
    for key, value in fields.items():
        lines.append(f'--{boundary}')
        lines.append(f'Content-Disposition: form-data; name="{key}"')
        lines.append('')
        lines.append(str(value))
    filename = os.path.basename(file_path)
    mime = mimetypes.guess_type(filename)[0] or 'application/octet-stream'
    lines.append(f'--{boundary}')
    lines.append(f'Content-Disposition: form-data; name="{file_field}"; filename="{filename}"')
    lines.append(f'Content-Type: {mime}')
    lines.append('')
    body = '
'.join(lines).encode('utf-8') + b'
' + open(file_path, 'rb').read() + b'
' + f'--{boundary}--
'.encode('utf-8')
    return boundary, body

file_path = 'sample_attachment.txt'
if not os.path.exists(file_path):
    with open(file_path, 'w', encoding='utf-8') as handle:
        handle.write('Sample attachment for the FlapMail Python example.')
if os.path.getsize(file_path) > 3 * 1024 * 1024:
    raise SystemExit('The selected file exceeds the 3 MB limit.')
payload = {
    'name': 'Alex Johnson',
    'email': 'alex@example.com',
    'message': 'Please review the attached file.',
    'token': FLAPMAIL_TOKEN,
    # format can be 'html' or 'text'
    'format': 'html',
    'form_type': 'docs'
}
if not is_valid_email(payload['email']):
    raise SystemExit('Please enter a valid email address.')
boundary, body = build_multipart(payload, 'file', file_path)
request = urllib.request.Request(ENDPOINT, data=body, method='POST')
request.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
with urllib.request.urlopen(request, timeout=30) as response:
    print(response.read().decode('utf-8'))
