import unittest
from smtp_server import send_smtp_email

class TestSMTP(unittest.TestCase):

    def test_send_smtp_email(self):
        result = send_smtp_email("example@example.com", "Test SMTP Email", "This is a test email via SMTP.")
        self.assertTrue(result)

if __name__ == '__main__':
    unittest.main()
