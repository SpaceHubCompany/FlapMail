import random
import urllib.parse
import urllib.request

ENDPOINT = 'https://app.flapmail.net/api/submit.php'


def c_to_f(celsius: float) -> float:
    return (celsius * 9 / 5) + 32


def main() -> None:
    token = input('Paste your FlapMail token: ').strip()
    if not token:
        raise SystemExit('A token is required.')

    celsius = round(random.uniform(18.0, 34.0), 1)
    fahrenheit = round(c_to_f(celsius), 1)

    payload = {
        'token': token,
        'format': 'html',
        'name': 'Temperature Bot',
        'email': 'bot@example.com',
        'message': f'Temperature report: {celsius} C / {fahrenheit} F',
        'sensor': 'Virtual Sensor',
        'temperature_celsius': str(celsius),
        'temperature_fahrenheit': str(fahrenheit),
    }

    encoded = urllib.parse.urlencode(payload).encode('utf-8')
    request = urllib.request.Request(ENDPOINT, data=encoded, method='POST')
    request.add_header('Content-Type', 'application/x-www-form-urlencoded')

    with urllib.request.urlopen(request, timeout=20) as response:
        print(response.read().decode('utf-8'))


if __name__ == '__main__':
    main()
