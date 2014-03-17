__author__ = 'addisonJoe'

import urllib
import httplib2


def postData():
    http = httplib2.Http()
    url = 'http://m.baidu.com/news?tn=bdapibaiyue&t=recommendlist'
    body = 'mid=03c7a16f2e8028127e42c5f7ca9e210b&ts=0&topic=%E7%A4%BE%E4%BC%9A&type=info&token=info&ln=200&an=20&withtopic=0&wf=0&internet-subscribe=0&ver=4&nids='
    headers = {'Content-type': 'application/x-www-form-urlencoded'}
    content = http.request(url, 'POST', headers=headers, body=body)
    print(content)


def getData(url):
    user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
    headers = {'User-Agent': user_agent}
    req = urllib.request.Request(url, None, headers)
    response = urllib.request.urlopen(req)
    page = response.read()
    return page.decode("utf-8")