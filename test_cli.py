import unittest
from cli import send_email, list_emails

class TestCLI(unittest.TestCase):

    def test_send_email(self):
        result = send_email("example@example.com", "Test Subject", "Test content.")
        self.assertEqual(result, "Email sent successfully!")

    def test_list_emails(self):
        emails = list_emails('inbox')
        self.assertIsInstance(emails, list)

if __name__ == '__main__':
    unittest.main()
