from http.server import BaseHTTPRequestHandler
import json
from urllib.parse import parse_qs, urlparse
import yt_dlp

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        query_params = parse_qs(urlparse(self.path).query)
        facebook_url = query_params.get('url', [None])[0]

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.send_header('Access-Control-Allow-Origin', '*')
        self.end_headers()

        if not facebook_url:
            self.wfile.write(json.dumps({"status": "error", "message": "No URL provided"}).encode())
            return

        try:
            # Setting up yt-dlp to get the direct video link
            ydl_opts = {'format': 'best', 'quiet': True}
            with yt_dlp.YoutubeDL(ydl_opts) as ydl:
                info = ydl.extract_info(facebook_url, download=False)
                video_download_url = info.get('url')
                title = info.get('title', 'facebook_video')

            response_data = {
                "status": "success",
                "download_url": video_download_url,
                "title": title
            }
        except Exception as e:
            response_data = {"status": "error", "message": str(e)}

        self.wfile.write(json.dumps(response_data).encode('utf-8'))
