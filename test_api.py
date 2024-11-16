import unittest
from app import app

class TestAPI(unittest.TestCase):

    def setUp(self):
        self.client = app.test_client()
        self.client.testing = True

    def test_fetch_emails(self):
        response = self.client.get('/emails?folder=inbox')
        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(response.json, list)

    def test_send_email(self):
        email_data = {
            "to": "example@example.com",
            "subject": "Test Email",
            "content": "This is a test email."
        }
        response = self.client.post('/send-email', json=email_data)
        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json['message'], "Email sent successfully")

if __name__ == '__main__':
    unittest.main()
