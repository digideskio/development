#proxies = {'http': 'http://wsg-proxy.oecd.org:80'}
from pickle import *
from BeautifulSoup import *
from urllib2 import *
from json import *
"""
filehandle=open("places.txt","r")
places=[]
placesHash={}
lines=filehandle.readlines()
filehandle.close()
for l in lines:
    place=l.split("\t")
    placesHash[place[0]]={"name":place[1],"region":place[2],"id":place[3]}
    places.append(place)

def is_number(s):
    try:
        float(s)
        return True
    except ValueError:
        return False

chapters=[]
characters=[]
charactersHash={}
filehandle=open("characters.txt","r")
characters=[]
charactersHash={}
lines=filehandle.readlines()
filehandle.close()
for l in lines:
    character=l.split("\t")
    charactersHash[character[0]]={"name":character[1],"id":character[2]}
    characters.append(place)

charactersInChapters=[]

terms={}
placesInChapters=[]
termsInChapters=[]

"""
chapters=[]
urlStart="http://awoiaf.westeros.org"
urlChapters="/index.php/Chapters"
#urlEnd="&content=list&event=M2011&lang=FR&num_results=30&pid=search&search[name]=&search[firstname]=&search[nation]=&search[start_no]=&search_sort=name&search_sort_order=ASC&top_results=3&type=search"


divs=[{'number':13,'book':"A Game of Thrones"},{'number':17,'book':"A Storm of Swords"},{'number':21,'book':"A Clash of Kings"},{'number':25,'book':"A Feast for Crows"},{'number':29,'book':"A Dance with Dragons"}]
url=urlStart+urlChapters
filehandle=urlopen(url)
html=filehandle.read()
filehandle.close()
soup=BeautifulSoup(html)
index=0
for div in divs:
    for a in soup.findAll("div")[div['number']].findAll("a"):
        chapter={}
        chapter['index']=index
        index+=1
        chapter['book']=div['book']
        chapter['title']=a.contents[0].strip()
        chapter['url']=a.attrs[0][1].strip()
        chapters.append(chapter)


urlStart="http://awoiaf.westeros.org"
characters={}
charactersInChapters=[]
places={}
terms={}
placesInChapters=[]
termsInChapters=[]
charIndex=0
placeIndex=0
termIndex=0
bigFile=""
for chapter in chapters:
    if chapter["index"]>-1: #change if interrupted
        url=urlStart+chapter["url"]
        filehandle=urlopen(url)
        html=filehandle.read()
        filehandle.close()
        soup=BeautifulSoup(html)
        body=soup.findAll("div",id="bodyContent")[0]
        innerhtml = body.prettify()
        bigFile+="\n"
        bigFile+=str(chapter['index'])+"\t"+str(chapter['book'])+"\t"+str(chapter['title'])+"\n\n"
        bigFile+=innerhtml
        bigFile+="\n--------------------------------------------------------------------------------\n"
        print ".",

filehandle=open("bigFile.html","w")
filehandle.write(unicode(bigFile, errors='ignore'))
filehandle.close()
