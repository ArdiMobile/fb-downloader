from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # Parse the URL parameters
        query = parse_qs(urlparse(self.path).query)
        video_url = query.get('url', [None])[0]

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()

        response = {
            "status": "success",
            "received_url": video_url,
            "message": "Backend connected successfully!"
        }
        
        self.wfile.write(json.dumps(response).encode('utf-8'))
