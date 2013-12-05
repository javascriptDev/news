__author__ = '宇乔'

import urllib
import urllib.request
import re

user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
headers = {'User-Agent': user_agent}
req = urllib.request.Request('http://roll.news.qq.com/', None, headers)
response = urllib.request.urlopen(req)
page = response.read()

pattern = re.compile(r'world')

match = pattern.search(page)
if match:
    # 使用Match获得分组信息
    print(match.group())
