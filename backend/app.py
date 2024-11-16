from flask import Flask, request, jsonify, send_from_directory
import os
import json
import time
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

MAILDIR = "./maildir"
INBOX_DIR = os.path.join(MAILDIR, "inbox")
SENT_DIR = os.path.join(MAILDIR, "sent")
DRAFTS_DIR = os.path.join(MAILDIR, "drafts")
ARCHIVE_DIR = os.path.join(MAILDIR, "archive")

for directory in [INBOX_DIR, SENT_DIR, DRAFTS_DIR, ARCHIVE_DIR]:
    os.makedirs(directory, exist_ok=True)

@app.route('/emails', methods=['GET'])
def get_emails():
    folder = request.args.get('folder', 'inbox')
    folder_path = os.path.join(MAILDIR, folder)
    emails = []

    if os.path.exists(folder_path):
        for filename in os.listdir(folder_path):
            with open(os.path.join(folder_path, filename), 'r') as f:
                emails.append(json.load(f))

    return jsonify(sorted(emails, key=lambda x: x.get('time', ''), reverse=True))

@app.route('/send-email', methods=['POST'])
def send_email():
    data = request.json
    subject = data.get('subject', '(No Subject)')
    filename = f"{int(time.time())}_{subject.replace(' ', '_')}.json"
    filepath = os.path.join(SENT_DIR, filename)

    with open(filepath, 'w') as f:
        json.dump(data, f, indent=4)

    return jsonify({"message": "Email sent successfully"})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
