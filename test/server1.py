__author__ = 'addisonJoe'

import http.server
import socket


PORT = 8001
ip = socket.gethostbyname(socket.gethostname())


class handler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        reqPath = self.path

        f = self.send_head()
        if f:
            self.copyfile(f, self.wfile)
            f.close()


try:
    server = http.server.HTTPServer((ip, PORT), handler)
    print('Started http server')
    server.serve_forever()
except KeyboardInterrupt:
    print('^C received, shutting down s')
    server.socket.close()




