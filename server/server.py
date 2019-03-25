directory = 'files/'
import os
import base64
import re

try:
    import http.server as server
except ImportError:
    import SimpleHTTPServer as server


class HTTPRequestHandler(server.SimpleHTTPRequestHandler):
    def do_POST(self):
        i = 1
        filename = directory + f'{i}.png'
        while True:
            if (os.path.exists(filename) == False):
                break
            else:
                i = i + 1
                filename = directory + f'{i}.png'
        file_length = int(self.headers['Content-Length'])
        image_b64 = self.rfile.read(file_length)
        imgdata = re.sub('^data:image/.+;base64,', '', image_b64.decode())
        imgdata = base64.b64decode(imgdata)
        with open(filename, 'wb') as f:
            f.write(imgdata)
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Content-Type', 'application/json')
        self.end_headers()
        reply_body = '{"status" : "saved"}\n'
        self.wfile.write(reply_body.encode('utf-8'))
        return

if __name__ == '__main__':
    server.test(HandlerClass=HTTPRequestHandler)
