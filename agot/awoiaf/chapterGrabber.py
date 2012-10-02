chapterHash=[]
i=0
for chapter in chapters:
    url="http://towerofthehand.com/"+chapter[0]    
    filehandle=urlopen(url)
    html=filehandle.read()
    filehandle.close()
    hash={"url":url,"title":chapter[1],"index":chapter[2],"html":html}
    chapterHash.append(hash)
    print "done with chapter "+str(chapter[2])+" ("+chapter[1]+")"

    
