import smtplib
from email.message import EmailMessage

def send_email(to, subject, message):
    msg = EmailMessage()
    msg.set_content(message)
    msg['Subject'] = subject
    msg['From'] = 'your-email@example.com'  # Replace with your email
    msg['To'] = to

    # Set up the SMTP server (Gmail in this case)
    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login('your-email@example.com', 'your-password')  # Replace with your credentials
            server.send_message(msg)
        print(f"Email sent to {to}")
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
