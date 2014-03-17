

__author__ = 'addisonJoe'

import json


def getData(data):
    list = []
    for item in data:
        content = item['content']
        if 'destination' in item.keys():
            destination = item['destination']
        if 'image' in item.keys():
            image = item['image']

        list.append({'text': content['headline'],
                     'source': content['source']['name'],
                     'abstract': content['abstract'],
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
        self.filePath = 'f:/JS/offlineNews/data/news.json'

    def getData(self, type):
        data = json.loads(util.getData(self.url))
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


data = BingNews()

#获取的数据存入相应的文件内
baseUrl = 'f:/JS/offlineNews/data/'

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
    json.dump(getData(data.getData(i['key'])), newsD)
    newsD.close()

















