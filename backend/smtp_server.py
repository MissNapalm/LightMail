from aiosmtpd.controller import Controller
import os
import json
import time

MAILDIR = "./maildir"

class EmailHandler:
    def __init__(self):
        for folder in ["inbox", "sent", "drafts", "archive"]:
            os.makedirs(os.path.join(MAILDIR, folder), exist_ok=True)

    async def handle_DATA(self, server, session, envelope):
        content = envelope.content.decode("utf-8")
        subject = envelope.headers.get("Subject", "(No Subject)")
        filename = f"{int(time.time())}_{subject.replace(' ', '_')}.json"
        filepath = os.path.join(MAILDIR, "inbox", filename)

        email_data = {
            "from": envelope.mail_from,
            "to": ", ".join(envelope.rcpt_tos),
            "subject": subject,
            "content": content,
            "time": time.strftime("%Y-%m-%d %H:%M:%S")
        }

        with open(filepath, "w") as f:
            json.dump(email_data, f, indent=4)

        print(f"Email received from {envelope.mail_from}")
        return "250 Message accepted for delivery"

def start_smtp_server():
    handler = EmailHandler()
    controller = Controller(handler, hostname="127.0.0.1", port=1025)
    controller.start()
    print("SMTP server running on localhost:1025")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        controller.stop()

if __name__ == "__main__":
    start_smtp_server()
