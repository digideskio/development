proxies = {'http': 'http://wsg-proxy.oecd.org:80'}
from pickle import *
from BeautifulSoup import *
from urllib2 import *
from json import *

places=[]
pHash={}
filehandle=open("places_tower.txt")
lines=filehandle.readlines()
i=0
for line in lines:
    place=line[:-1].split("\t")
    pHash[place[2]]={"place":place[1],"id":i}
    i+=1
    places.append(place)
filehandle.close()

characters=[]
cHash={}
filehandle=open("characters_tower.txt")
lines=filehandle.readlines()
i=0
for line in lines:
    character=line[:-1].split("\t")
    cHash[character[2]]={"char":character[1],"id":i}
    i+=1
    characters.append(character)
filehandle.close()

chapters=[]
filehandle=open("chapters_tower.txt")
lines=filehandle.readlines()
i=0
for line in lines:
    chapter=line[:-1].split("\t")
    chapter.append(i)
    i+=1
    chapters.append(chapter)

filehandle.close()

charInChapters={}
placInChapters={}

for chapter in chapters:
    url="http://towerofthehand.com/"+chapter[0]
    filehandle=urlopen(url)
    html=filehandle.read()
    filehandle.close()
    soup=BeautifulSoup(html)
    print chapter[1]
    #try:
    teaser=soup.findAll("span", {"class":"teaser"})[0].contents[3]
    chapter.append(teaser)
    

    pics=[]
    cics=[]
    link=d.findAll("li")[0].findAll("a")[0].attrs[0][1]
    pov=cHash[link]
    chapter.append(pov)
    cics.append(pov)

    d=soup.findAll("div",{"class":"linear-content"})[0]
    for a in d.findAll("a"):
        link=a.attrs[0][1]
        if link in cHash.keys() and link not in cics:
            cics.append(link)
    if len(cics)>0:
        for link in cics:
            cic={"chapter":chapter[2],"title":chapter[1],"char":cHash[link]["char"],"url":link,"active":True}
            if len(characters[cHash[link]["id"]])==4:
                characters[cHash[link]["id"]].append(chapter[2])
                characters[cHash[link]["id"]].append(1)
                characters[cHash[link]["id"]].append(chapter[2])
            else:
                characters[cHash[link]["id"]][5]+=1
                characters[cHash[link]["id"]][6]=chapter[2]
            charInChapters.append(cic)
    d=soup.findAll("div",{"class":"entry_text"})[0]
    for a in d.findAll("a"):
        link=a.attrs[0][1]
        if link in cHash.keys() and link not in cics:
            cics.append(link)
        if link in pHash.keys() and link not in pics:
            pics.append(link)

    if len(cics)>0:
        for link in cics:
            cic={"chapter":chapter[2],"title":chapter[1],"char":cHash[link]["char"],"url":link,"active":False}
            character=cHash[link]
            if len(characters[cHash[link]["id"]])==4:
                characters[cHash[link]["id"]].append(chapter[2])
                characters[cHash[link]["id"]].append(1)
                characters[cHash[link]["id"]].append(chapter[2])
            else:
                characters[cHash[link]["id"]][5]+=1
                characters[cHash[link]["id"]][6]=chapter[2]
            charInChapters.append(cic)
    if len(pics)>0:
        for link in pics:
            pic={"chapter":chapter[2],"title":chapter[1],"place":pHash[link]["place"],"url":link}
            if len(places[pHash[link]["id"]])==5:
                places[pHash[link]["id"]].append(chapter[2])
                places[pHash[link]["id"]].append(1)
                places[pHash[link]["id"]].append(chapter[2])
            else:
                places[pHash[link]["id"]][6]+=1
                places[pHash[link]["id"]][7]=chapter[2]
            placInChapters.append(pic)
                
    #except IndexError:
    #   print "exception... sorry"
    
    
