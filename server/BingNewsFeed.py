__author__ = 'addisonJoe'

import json
import sys
import urllib.parse
import urllib.request
import re


def filterData(data):
    list = []
    for item in data:
        content = item['content']
        image = []
        destination = ''
        if 'destination' in item.keys():
            destination = item['destination']
        if 'image' in item.keys():
            image = item['image']

        list.append({'text': re.sub('<[^>]+>', '', str(content['headline'])),
                     'source': content['source']['name'],
                     'abstract': re.sub('<[^>]+>', '', content['abstract']),
                     'destination': destination,
                     'images': image
        });
    return list


class BingNews():
    def __init__(self):
        self.url = 'http://zh-cn.appex-rf.msn.com/cg/v5/ZH-CN/news/today.js?Client-AppVersion=3.0.2.233'
        self.data = {}
        self.type = {
            'topStory': 'topStories',
            'china': 'rt_China',
            'world': 'rt_World',
            'entertainment': 'rt_Entertainment',
            'technology': 'rt_ScienceAndTechnology',
            'health': 'rt_Health',
            'lifeStyle': 'rt_LifeStyle',
            'auto': 'rt_Auto',
            'education': 'rt_Education',
            'military': 'rt_Military',
            'sports': 'rt_Sports',
            'business': 'rt_Business'
        }


    def getData(self, type):
        data = json.loads(self.Ajax(self.url))
        lastModifiedDate = data['lastModified']
        # database = DB.db()
        # database.add(lastModifiedDate, data);
        clusters = data['clusters']
        for item in clusters:
            if 'hero' in item.keys():
                self.data['hero'] = item
            else:
                tname = item['entityList']['collectionId']
                self.data[tname] = item['entityList']['entities']

        return self.data[self.type[type]];

    def Ajax(self, url):
        user_agent = 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_4; en-US) AppleWebKit/534.3 (KHTML, like Gecko) Chrome/6.0.472.63 Safari/534.3'
        headers = {'User-Agent': user_agent}
        req = urllib.request.Request(url, None, headers)
        response = urllib.request.urlopen(req)
        page = response.read()
        return page.decode("utf-8")


data = BingNews()

#获取的数据存入相应的文件内
baseUrl = 'f:/JS/news/data/'

topStory = baseUrl + 'news.json'
sports = baseUrl + 'sports.json'
china = baseUrl + 'china.json'
world = baseUrl + 'world.json'
education = baseUrl + 'education.json'
health = baseUrl + 'health.json'
technology = baseUrl + 'tech.json'
entertainment = baseUrl + 'entertainment.json'

dataList = [
    {'url': topStory, 'key': 'topStory'},
    {'url': sports, 'key': 'sports'},
    {'url': china, 'key': 'china'},
    {'url': world, 'key': 'world'},
    {'url': education, 'key': 'education'},
    {'url': health, 'key': 'health'},
    {'url': technology, 'key': 'technology'},
    {'url': entertainment, 'key': 'entertainment'}

];

for i in dataList:
    newsD = open(i['url'], 'r+')
    newsD.seek(0);
    newsD.truncate();
    json.dump(filterData(data.getData(i['key'])), newsD)
    newsD.close()













