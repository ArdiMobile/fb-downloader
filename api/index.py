from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        # 1. Parse the incoming URL and query parameters
        # This looks for the "?url=" part sent by your script.js
        query_params = parse_qs(urlparse(self.path).query)
        facebook_url = query_params.get('url', [None])[0]

        # 2. Set the response headers
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        # Crucial for preventing "CORS" errors between frontend and backend
        self.send_header('Access-Control-Allow-Origin', '*') 
        self.end_headers()

        # 3. Logic: If a URL was sent, acknowledge it
        if facebook_url:
            response_data = {
                "status": "success",
                "received_url": facebook_url,
                "message": "Backend connected successfully!"
            }
        else:
            response_data = {
                "status": "error",
                "received_url": None,
                "message": "No URL provided in the request."
            }

        # 4. Send the JSON response back to the website
        self.wfile.write(json.dumps(response_data).encode('utf-8'))
        return
