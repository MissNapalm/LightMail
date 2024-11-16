from aiosmtpd.controller import Controller
from email.parser import BytesParser
from email.policy import default
import os
import json
import time

MAILDIR = "./maildir"

class EmailHandler:
    def __init__(self):
        # Ensure mail directories exist
        for folder in ["inbox", "sent", "drafts", "archive"]:
            os.makedirs(os.path.join(MAILDIR, folder), exist_ok=True)
        print("Email handler initialized.")

    async def handle_DATA(self, server, session, envelope):
        # Parse the email message from the raw content
        msg = BytesParser(policy=default).parsebytes(envelope.content)

        # Prepare email data
        email_data = {
            "from": msg.get("From", envelope.mail_from),
            "to": msg.get("To", ', '.join(envelope.rcpt_tos)),
            "subject": msg.get("Subject", "(No Subject)"),
            "content": msg.get_payload(decode=True).decode(msg.get_content_charset('utf-8'), errors='replace'),
            "time": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
        }

        # Generate a unique filename for the email
        filename = f"{int(time.time())}_{email_data['subject'].replace(' ', '_')}.json"
        inbox_path = os.path.join(MAILDIR, "inbox", filename)

        # Save the email data to the inbox folder
        with open(inbox_path, "w") as f:
            json.dump(email_data, f, indent=4)

        print(f"Email received from {email_data['from']}, saved to inbox as {filename}.")
        return '250 Message accepted for delivery'

def start_smtp_server():
    handler = EmailHandler()
    controller = Controller(handler, hostname="127.0.0.1", port=1025)
    print("Starting SMTP server...")
    controller.start()
    print("SMTP server running at localhost:1025")

    try:
        # Keep the main thread alive
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("Stopping SMTP server...")
    finally:
        controller.stop()

if __name__ == "__main__":
    start_smtp_server()
