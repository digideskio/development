"""
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
filehandle.write("URL\tname\t\id\tFirst mention\tMentions\tLast mention\n")
for link in charactersHash.keys():
    character=charactersHash[link]
    if "firstMention" not in character.keys():
        character["firstMention"]=-1
        character["mentions"]=0
        character["lastMention"]=0
    filehandle.write(link+"\t"+character["name"]+"\t"+str(character["id"])+"\t"+str(character["firstMention"])+"\t"+str(character["mentions"])+"\t"+str(character["lastMention"])+"\n")
filehandle.close()

filehandle=open("places.txt","w")
filehandle.write("URL\tname\t\id\tFirst mention\tMentions\tLast mention\n")
for link in placesHash.keys():
    place=placesHash[link]
    if "firstMention" not in place.keys():
        place["firstMention"]=-1
        place["mentions"]=0
        place["lastMention"]=0
    filehandle.write(link+"\t"+place["name"]+"\t"+str(place["id"])+"\t"+str(place["firstMention"])+"\t"+str(place["mentions"])+"\t"+str(place["lastMention"])+"\n")
filehandle.close()
"""
filehandle=open("chapters.txt","w")
filehandle.write("index\tbook\ttitle\turl\n")
for chapter in chapters:
    #{'url': u'/index.php/Appendix_(A_Dance_with_Dragons)', 'index': 348, 'book': 'A Dance with Dragons', 'title': u'Appendix'}
    filehandle.write(str(chapter["index"])+"\t"+chapter["book"]+"\t"+chapter["title"]+"\t"+chapter["url"]+"\n")
filehandle.close()
