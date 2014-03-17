__author__ = '宇乔'

import json




# user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
# headers = {'User-Agent': user_agent}
# req = urllib.request.Request('http://roll.news.qq.com/', None, headers)
# response = urllib.request.urlopen(req)
# page = response.read()
#
# html = page.decode("gb2312");
#
# print(re.search('<[aA].*?>.+?</[aA]>', html, 0).group())
#
#



#
s = [];
data = []

for i in range(0, 100):
    name = i * i + 1
    data.append(json.dumps({'name': name, 'age': i + 1}));

fobj = open("../data.json", 'w');
fobj.writelines('[' + ','.join(data) + ']');
fobj.close()