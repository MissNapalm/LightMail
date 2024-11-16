import requests

BASE_URL = 'http://127.0.0.1:5000'

def get_emails(folder):
    response = requests.get(f"{BASE_URL}/emails?folder={folder}")
    return response.json()

def send_email(to, subject, content):
    payload = {"to": to, "subject": subject, "content": content}
    response = requests.post(f"{BASE_URL}/send-email", json=payload)
    return response.json()
