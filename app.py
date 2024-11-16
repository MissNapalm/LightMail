from flask import Flask, request, jsonify, render_template, send_from_directory
import smtplib
from email.message import EmailMessage
import os
import json
import time
from flask_cors import CORS

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)  # Enable Cross-Origin Resource Sharing if necessary

# Define the mail directories
MAILDIR = "./maildir"
INBOX_DIR = os.path.join(MAILDIR, "inbox")
SENT_DIR = os.path.join(MAILDIR, "sent")
DRAFTS_DIR = os.path.join(MAILDIR, "drafts")
ARCHIVE_DIR = os.path.join(MAILDIR, "archive")

# Ensure mail directories exist
for directory in [INBOX_DIR, SENT_DIR, DRAFTS_DIR, ARCHIVE_DIR]:
    os.makedirs(directory, exist_ok=True)

@app.route('/')
@app.route('/')
def index():
    return send_from_directory('templates', 'index.html', mimetype='text/html')

@app.route('/static/<path:path>')
def send_static(path):
    # Serve static files (if any)
    return send_from_directory('static', path)

@app.route('/send-email', methods=['POST'])
def send_email_route():
    data = request.json
    required_fields = ['to', 'subject', 'content']
    if not all(field in data for field in required_fields):
        return jsonify({'error': 'Missing required fields'}), 400

    to_address = data['to']
    subject = data['subject']
    content = data['content']

    # Create the email message
    msg = EmailMessage()
    msg['From'] = 'you@example.com'  # Replace with your email or keep as placeholder
    msg['To'] = to_address
    msg['Subject'] = subject
    msg.set_content(content)

    try:
        # Send the email via the local SMTP server
        with smtplib.SMTP('localhost', 1025) as server:
            server.send_message(msg)

        # Save the email to the 'sent' folder
        filename = f"{int(time.time())}_{subject.replace(' ', '_')}.json"
        sent_path = os.path.join(SENT_DIR, filename)
        email_data = {
            "from": msg['From'],
            "to": msg['To'],
            "subject": msg['Subject'],
            "content": content,
            "time": time.strftime("%Y-%m-%d %H:%M:%S", time.localtime()),
        }
        with open(sent_path, "w") as f:
            json.dump(email_data, f, indent=4)

        return jsonify({'message': 'Email sent successfully'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': 'Failed to send email'}), 500

@app.route('/emails', methods=['GET'])
def get_emails():
    folder = request.args.get('folder', 'inbox')
    valid_folders = {
        'inbox': INBOX_DIR,
        'sent': SENT_DIR,
        'drafts': DRAFTS_DIR,
        'archive': ARCHIVE_DIR
    }

    if folder not in valid_folders:
        return jsonify({'error': 'Invalid folder'}), 400

    folder_path = valid_folders[folder]
    emails = []

    if os.path.exists(folder_path):
        for filename in os.listdir(folder_path):
            filepath = os.path.join(folder_path, filename)
            if os.path.isfile(filepath) and filename.endswith('.json'):
                with open(filepath, 'r') as f:
                    email_data = json.load(f)
                    emails.append(email_data)

    # Sort emails by time (newest first)
    emails.sort(key=lambda x: x.get('time', ''), reverse=True)
    return jsonify(emails)

if __name__ == '__main__':
    app.run(debug=True, port=5000)