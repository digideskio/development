proxies = {'http': 'http://wsg-proxy.oecd.org:80'}
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

#chapters=[]
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
"""
for chapter in chapters:
    if chapter["index"]>74:
        url=urlStart+chapter["url"]
        filehandle=urlopen(url)
        html=filehandle.read()
        filehandle.close()
        soup=BeautifulSoup(html)
        """
        if len(soup.findAll("table", {"class":"wikitable"}))>0:
            t=soup.findAll("table", {"class":"wikitable"})[0]
            present=True
            for td in t.findAll("td"):
                if len(td.findAll("b"))>0:
                    present=(td.find("b").contents[0].strip()=="Appearing:") #if no bold text is present, we keep the value for the previous cell, and true by default
                for li in td.findAll("li"):
                    name=li.find("a").contents[0].strip()
                    if name not in characters.keys():
                        characters[name]={"url":li.find("a").attrs[0][1].strip(),"index":charIndex}
                        charIndex+=1
                    cic={"chapter":chapter["index"],"character":name,"role":"present" if present else "mentioned"}
                    charactersInChapters.append(cic)
            if len(soup.findAll("table", {"class":"wikitable"}))>1:
                t=soup.findAll("table", {"class":"wikitable"})[1]
                for td in t.findAll("td"):
                    if(len(td.findAll("b"))>0):
                        place=(td.find("b").contents[0].strip()=="Places:")
                    else:
                        place=True #assuming places are in that table then.
                    for li in td.findAll("li"):
                        name=li.find("a").contents[0].strip()
                        if place:
                            if name not in places.keys():
                                places[name]={"url":li.find("a").attrs[0][1].strip()}
                            pic={"chapter":chapter["index"],"place":name}
                            placesInChapters.append(pic)
                        else:
                            if name not in terms.keys():
                                terms[name]={"url":li.find("a").attrs[0][1].strip()}
                            tic={"chapter":chapter["index"],"term":name}
                            termsInChapters.append(tic)
            else:
                print "WARNING: no places or terms table for chapter "+chapter["title"]+" ("+str(chapter["index"])+")"
        else:
            print "WARNING: no character table found for chapter "+chapter["title"]+" ("+str(chapter["index"])+")"
        """
        if chapter["title"]=="Appendix":
            print "skipping appendix."
        else:
            print "Places or characters in "+chapter["title"]+" ("+chapter["book"]+"-"+str(chapter["index"])+"):"
            pics=[]
            cics=[]
            for a in soup.findAll("a"):
                link=a.attrs[0][1]
                if link in placesHash.keys():
                    if link not in pics:
                        pics.append(link)
                if link in charactersHash.keys():
                    if link not in cics:
                        cics.append(link)
            if len(pics)==0:
                print"--WARNING: no place information found"
            else:
                print"  Places:"
                for link in pics:
                    pic={"chapter":chapter["index"],"book":chapter["book"],"title":chapter["title"],"placeURL":link,"place":placesHash[link]["name"],"id":placesHash[link]["id"]}
                    placesInChapters.append(pic)
                    if "firstMention" not in placesHash[link]:
                        placesHash[link]["firstMention"]=chapter["index"]
                    if "mentions" not in placesHash[link]:
                        placesHash[link]["mentions"]=1
                    else:
                        placesHash[link]["mentions"]+=1
                    placesHash[link]["lastMention"]=chapter["index"]        
                    print "found mention of "+placesHash[link]["name"]
            if len(cics)==0:
                print"--WARNING: no character information found"
            else:
                print"  Characters:"
                for link in cics:
                    cic={"chapter":chapter["index"],"book":chapter["book"],"title":chapter["title"],"characterURL":link,"character":charactersHash[link]["name"],"id":charactersHash[link]["id"]}
                    charactersInChapters.append(cic)
                    if "firstMention" not in charactersHash[link]:
                        charactersHash[link]["firstMention"]=chapter["index"]
                    if "mentions" not in charactersHash[link]:
                        charactersHash[link]["mentions"]=1
                    else:
                        charactersHash[link]["mentions"]+=1
                    charactersHash[link]["lastMention"]=chapter["index"]        
                    
                    print "found mention of "+charactersHash[link]["name"]
                
            print "done for "+chapter["title"]+"."
filehandle=open("placesInChapter.txt","w")
filehandle.write("Chapter\tBook\tTitle\tplaceURL\tPlace\tID\n")
for place in placesInChapters:
    filehandle.write(str(place["chapter"])+"\t"+place["book"]+"\t"+place["title"]+"\t"+place["placeURL"]+"\t"+place["place"]+"t"+str(place["id"])+"\n")
filehandle.close()

filehandle=open("charactersInChapter.txt","w")
filehandle.write("Chapter\tBook\tTitle\tcharacterURL\tCharacter\tID\n")
for character in charactersInChapters:
    filehandle.write(str(character["chapter"])+"\t"+character["book"]+"\t"+character["title"]+"\t"+character["characterURL"]+"\t"+character["character"]+"t"+str(character["id"])+"\n")
filehandle.close()

filehandle=open("characters.txt","w")
filehandle.write("URL\t\name\t\id\tFirst mention\tMentions\tLast mention\n")
for link in charactersHash.keys():
    character=charactersHash[link]
    if "firstMention" not in character.keys():
        character["firstMention"]=-1
        character["mentions"]=0
        character["lastMention"]=0
    filehandle.write(link+"\t"+character["name"]+"\t"+str(character["id"])+"\t"+str(character["firstMention"])+"\t"+str(character["mentions"])+"\t"+str(character["lastMention"])+"\n")
filehandle.close()

filehandle=open("places.txt","w")
filehandle.write("URL\t\name\t\id\tFirst mention\tMentions\tLast mention\n")
for link in placesHash.keys():
    place=placesHash[link]
    if "firstMention" not in place.keys():
        place["firstMention"]=-1
        place["mentions"]=0
        place["lastMention"]=0
    filehandle.write(link+"\t"+place["name"]+"\t"+str(place["id"])+"\t"+str(place["firstMention"])+"\t"+str(place["mentions"])+"\t"+str(place["lastMention"])+"\n")
filehandle.close()
