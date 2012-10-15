token="14624309-G4FTU63rdlGEFPCJdKbN1qLcOwlRysTou06ZtYVto"
token_key="rxVrryQdlcfZPuO8QrHal4DMj2tI9WHaNXhwSOGdSM"
con_secret="P6DfN32vTZDkSZfglYryXWStT3xJaOKaRUz8SszHQ"
con_secret_key="ppHAC64cJGBBlwIx9ES4fw"
t=Twitter(auth=OAuth(token, token_key, con_secret, con_secret_key))

ids=[14073364,257126470,48737760,5532332,23815843,51343242,106586450,428526443,26050133,127634032,34255829,414273176,125924697,783935,7938482,3499161,14196638,14060372,15586855,10078132,12954062,23605295,275031945,19983731,153873366,6154922,16910331,15906950,11069462,41131123,16887185,15209571,14792516,23486491,17636894,9313022,8078492,157074463,19663369,16319797,18994444,80201928,807095,14875983,93046641,13982132,23751864,36843988,2384071,100074406,18140773,15648675,55236002,385527213,14819642,54680395,69137362,620224738,16685369,48292876,43901113,19037299,13860742,11584672,119228939,67497550,152875920,17027590,15827690,40144128,5695942,74881716,24622734,165834612,117604696,33318712,25340811,347276428,50411677,15594986,80422885,246033684,575328684,12499512,790539,1682431,19294998,6886122,16141554,14849338,705790130,20685061,34387624,16947461,20743,130321526,88551759,64496701,19681818,14207040,6146692,22437228,12955672,23365014,142389870,14299324,52012409,22900580,18037154,34031722,36967017,15290966,431465382,31513,5751212,38371266,59180252,12688902,23732507,295513152,76245662,292036840,18565158,103917660,96152942,15184365,519769200,36853217,465890857,438301090,19671465,404895983,59763,20609086,661403,11047252,30923,91144162,1971791,7238342,949521,20399581,713263,752673,662433,1671811,13145012,53565454,20831032,8169522,59512534,42213419,162441059,19764564,18255713,161539552,8055642,17023925,18060155,219938365,325715021,33919893,87810665,17034624,309236605,203574892,15292919,16228026,414382936,55090131,219417123,243373933,17083588,14095905,14664725,19848777,15019184,622492537,746136324,16002116,166333035,85947682,19604884,42641833,16292948,15730804,90640619,21722534,225390424,36153601,355541062,963,208789178,116897811,14504451,17163609,14526679,8815922,14839109,7985672,14578294,11595422,14344469,184924560,4628121,10454572,7865282,14245341,19417850,15187032,852241,14601733,884301,711303,14517538,2150981,17882795,15964196,760654,17677665,18682941,626103,111455662,1976841,13691922,258646283,20241927,15817979,5911972,6183492,64453665,291049714,18503033,19507483,818340,1756191,1586501,16745770,20153725,17689928,17474208,5475642,15170467,6735,4833,34329742,15693631,23232776,11922692,11039482,27385146,226212840,55677993,12014302,15320887,3183721,14727207,5273561,14305066,8612292,16789581,3865131,96865531,9841042,21425450,352644923,14335332,18409071,1504011,40801291,321792211,158865339,110866649,187171682,33045477,42936497,29387184,225876556,19802879,260022048,15698507,583434310,42744294,367089411,137712607,5743162,22186660,43593,12377822,1458271,3176751,35000660,130314799,22862042,17532116,14074424,501968170,18695747,289682124,17863,2067201,290079374,6488302,812984,17242168,591573,68699697,32889156,52184782,15377617,458647237,17795885,9207632,15248437,382123770,14062210,22684408,14343560,18824842,14122878,17840026,2735591,722493,14420872,765548,225138752,22512172,25151614,14892191,155240092,8564482,177507079,17013577,12483772,15947897,21695487,34733652,15399031,152862026]

details=[]
>>> for h in range(int(len(ids)/100+1)):
...   query=str(ids[h*100])
...   for j in range(1,min(100,len(ids)-h*100)):
...     query=query+","+str(ids[h*100+j])
...   details=details+t.users.lookup(user_id=query)
...   print "100 ids queried."

import os
>>> os.getcwd()
'/Users/jeromecukier'
>>> os.chdir("./documents")
>>> os.getcwd()
'/Users/jeromecukier/Documents'
>>> f=open("details.txt","w")
>>> f.writelines(details)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: writelines() argument must be a sequence of strings
>>> from json import *
>>> for l in details:
... 
  File "<stdin>", line 2
    
    ^
IndentationError: expected an indented block
>>> 
>>> dumps(details[0])
'{"follow_request_sent": false, "profile_use_background_image": true, "id": 14207040, "description": "Developer with special expertise in data visualization and text analysis. Creator of Neoformix.com", "verified": false, "profile_image_url_https": "https://si0.twimg.com/profile_images/67925198/Jeff9_normal.jpg", "profile_sidebar_fill_color": "DCEEFF", "geo_enabled": true, "profile_text_color": "000000", "followers_count": 3354, "protected": false, "location": "Toronto", "default_profile_image": false, "id_str": "14207040", "status": {"favorited": false, "contributors": null, "truncated": false, "text": "RT @flight404: New Yorkers walk like they\'ve never heard of flocking algorithms.", "created_at": "Sat Sep 29 12:09:04 +0000 2012", "retweeted": false, "in_reply_to_status_id_str": null, "coordinates": null, "id": 252017147407134721, "source": "<a href=\\"http://www.tweetdeck.com\\" rel=\\"nofollow\\">TweetDeck</a>", "in_reply_to_status_id": null, "place": null, "id_str": "252017147407134721", "in_reply_to_screen_name": null, "retweet_count": 0, "geo": null, "in_reply_to_user_id_str": null, "in_reply_to_user_id": null}, "utc_offset": -18000, "statuses_count": 1534, "profile_background_color": "9BE5E9", "friends_count": 524, "profile_link_color": "0000FF", "profile_image_url": "http://a0.twimg.com/profile_images/67925198/Jeff9_normal.jpg", "notifications": false, "profile_background_image_url_https": "https://si0.twimg.com/profile_background_images/2771443/nontile3.png", "profile_background_image_url": "http://a0.twimg.com/profile_background_images/2771443/nontile3.png", "screen_name": "JeffClark", "lang": "en", "following": false, "profile_background_tile": true, "favourites_count": 13, "name": "Jeff Clark", "url": "http://neoformix.com", "created_at": "Mon Mar 24 12:36:49 +0000 2008", "contributors_enabled": false, "time_zone": "Eastern Time (US & Canada)", "profile_sidebar_border_color": "444EBC", "default_profile": false, "is_translator": false, "listed_count": 393}'
>>> for l in details:
...   f.write("%s\n" % dumps(l))
... 
>>> f.close()
>>> f=open("sl.txt","w")
>>>   f.write("%s\t%s\n" % l["screen_name"],l["location"])
  File "<stdin>", line 1
    f.write("%s\t%s\n" % l["screen_name"],l["location"])
    ^
IndentationError: unexpected indent
>>> f=open("sl.txt","w")
>>> for l in details:
...   f.write("%s\t%s\n" % l["screen_name"],l["location"])
... 
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: not enough arguments for format string
>>>   f.write(l["screen_name"]+"\t"+l["location"]+"\n")
  File "<stdin>", line 1
    f.write(l["screen_name"]+"\t"+l["location"]+"\n")
    ^
IndentationError: unexpected indent
>>> 
>>> for l in details:
...   f.write(l["screen_name"]+"\t"+l["location"]+"\n")
... f.close()
  File "<stdin>", line 3
    f.close()
    ^
SyntaxError: invalid syntax
>>> f.close()
>>> f=open("sl.txt","w")
>>> for l in details:
...   f.write(l["screen_name"]+"\t"+l["location"]+"\n")
... 
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
UnicodeEncodeError: 'ascii' codec can't encode character u'\xdc' in position 13: ordinal not in range(128)
>>> l
{u'follow_request_sent': False, u'profile_use_background_image': True, u'id': 12499512, u'description': u'VP Marketing, Fan Appz at http://www.fanappz.com. Also, NPR fanatic, free lecture geek & lover of all things Internet.', u'verified': False, u'profile_image_url_https': u'https://si0.twimg.com/profile_images/2624625376/467rr9rlthhw8wq166hx_normal.jpeg', u'profile_sidebar_fill_color': u'FFF7CC', u'geo_enabled': True, u'profile_text_color': u'0C3E53', u'followers_count': 3669, u'protected': False, u'location': u'\xdcT: 34.064306,-118.37251', u'profile_background_color': u'8B542B', u'id_str': u'12499512', u'status': {u'favorited': False, u'contributors': None, u'retweeted_status': {u'favorited': False, u'contributors': None, u'truncated': False, u'text': u'Bootstrap creators leave Twitter for Obvious and GitHub but vow to keep working on open-source project http://t.co/FDZvyzWa by @robinwauters', u'created_at': u'Sat Sep 29 10:50:16 +0000 2012', u'retweeted': False, u'in_reply_to_status_id_str': None, u'coordinates': None, u'id': 251997316620361728, u'source': u'<a href="http://spread.us" rel="nofollow">Spread The Next Web</a>', u'in_reply_to_status_id': None, u'place': None, u'id_str': u'251997316620361728', u'in_reply_to_screen_name': None, u'retweet_count': 545, u'geo': None, u'in_reply_to_user_id_str': None, u'possibly_sensitive': False, u'in_reply_to_user_id': None}, u'truncated': False, u'text': u'RT @TheNextWeb: Bootstrap creators leave Twitter for Obvious and GitHub but vow to keep working on open-source project http://t.co/FDZvy ...', u'created_at': u'Sat Sep 29 10:50:42 +0000 2012', u'retweeted': False, u'in_reply_to_status_id_str': None, u'coordinates': None, u'id': 251997425919750144, u'source': u'<a href="http://spread.us" rel="nofollow">Spread The Next Web</a>', u'in_reply_to_status_id': None, u'place': None, u'id_str': u'251997425919750144', u'in_reply_to_screen_name': None, u'retweet_count': 545, u'geo': None, u'in_reply_to_user_id_str': None, u'possibly_sensitive': False, u'in_reply_to_user_id': None}, u'utc_offset': -28800, u'statuses_count': 12640, u'default_profile_image': False, u'friends_count': 2568, u'profile_link_color': u'9D582E', u'profile_image_url': u'http://a0.twimg.com/profile_images/2624625376/467rr9rlthhw8wq166hx_normal.jpeg', u'notifications': False, u'profile_background_image_url_https': u'https://si0.twimg.com/profile_background_images/663059096/o8sgqjorqzfxtljnewpn.png', u'profile_banner_url': u'https://si0.twimg.com/profile_banners/12499512/1348008036', u'profile_background_image_url': u'http://a0.twimg.com/profile_background_images/663059096/o8sgqjorqzfxtljnewpn.png', u'screen_name': u'kristathomas', u'lang': u'en', u'following': False, u'profile_background_tile': True, u'favourites_count': 31, u'name': u'kristathomas', u'url': u'http://www.fanappz.com', u'created_at': u'Mon Jan 21 16:41:26 +0000 2008', u'contributors_enabled': False, u'time_zone': u'Pacific Time (US & Canada)', u'profile_sidebar_border_color': u'FFFFFF', u'default_profile': False, u'is_translator': False, u'listed_count': 174}
>>> l["screen_name"]
u'kristathomas'
>>> l["location"]
u'\xdcT: 34.064306,-118.37251'
>>> u=l["location"]
>>> unicode(u,errors="ignore")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: decoding Unicode is not supported
>>> unicode(u,"utf8",errors="ignore")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: decoding Unicode is not supported
>>> unicode(u,"utf8",errors="ignore")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: decoding Unicode is not supported
>>> print '%(screen_name)s;%(location)s" % details[0]'
%(screen_name)s;%(location)s" % details[0]
>>> print '%(screen_name)s;%(location)s' % details[0]
JeffClark;Toronto
>>>   f.write('%(screen_name)s\t%(location)\n',l)
  File "<stdin>", line 1
    f.write('%(screen_name)s\t%(location)\n',l)
    ^
IndentationError: unexpected indent
>>> for l in details:
...   f.write('%(screen_name)s\t%(location)\n',l)
... 
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
TypeError: function takes exactly 1 argument (2 given)
>>>   f.write('%(screen_name)s\t%(location)\n' % l)
  File "<stdin>", line 1
    f.write('%(screen_name)s\t%(location)\n' % l)
    ^
IndentationError: unexpected indent
>>> for l in details:
...   f.write('%(screen_name)s\t%(location)\n' % l)
... 
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
ValueError: unsupported format character '?' (0xa) at index 27
>>> l
{u'follow_request_sent': False, u'profile_use_background_image': True, u'id': 14207040, u'description': u'Developer with special expertise in data visualization and text analysis. Creator of Neoformix.com', u'verified': False, u'profile_image_url_https': u'https://si0.twimg.com/profile_images/67925198/Jeff9_normal.jpg', u'profile_sidebar_fill_color': u'DCEEFF', u'geo_enabled': True, u'profile_text_color': u'000000', u'followers_count': 3354, u'protected': False, u'location': u'Toronto', u'default_profile_image': False, u'id_str': u'14207040', u'status': {u'favorited': False, u'contributors': None, u'truncated': False, u'text': u"RT @flight404: New Yorkers walk like they've never heard of flocking algorithms.", u'created_at': u'Sat Sep 29 12:09:04 +0000 2012', u'retweeted': False, u'in_reply_to_status_id_str': None, u'coordinates': None, u'id': 252017147407134721, u'source': u'<a href="http://www.tweetdeck.com" rel="nofollow">TweetDeck</a>', u'in_reply_to_status_id': None, u'place': None, u'id_str': u'252017147407134721', u'in_reply_to_screen_name': None, u'retweet_count': 0, u'geo': None, u'in_reply_to_user_id_str': None, u'in_reply_to_user_id': None}, u'utc_offset': -18000, u'statuses_count': 1534, u'profile_background_color': u'9BE5E9', u'friends_count': 524, u'profile_link_color': u'0000FF', u'profile_image_url': u'http://a0.twimg.com/profile_images/67925198/Jeff9_normal.jpg', u'notifications': False, u'profile_background_image_url_https': u'https://si0.twimg.com/profile_background_images/2771443/nontile3.png', u'profile_background_image_url': u'http://a0.twimg.com/profile_background_images/2771443/nontile3.png', u'screen_name': u'JeffClark', u'lang': u'en', u'following': False, u'profile_background_tile': True, u'favourites_count': 13, u'name': u'Jeff Clark', u'url': u'http://neoformix.com', u'created_at': u'Mon Mar 24 12:36:49 +0000 2008', u'contributors_enabled': False, u'time_zone': u'Eastern Time (US & Canada)', u'profile_sidebar_border_color': u'444EBC', u'default_profile': False, u'is_translator': False, u'listed_count': 393}
>>> print('%(screen_name)s\t%(location)\n' % l)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: unsupported format character '?' (0xa) at index 27
>>> print('%(screen_name)s;%(location)\n' % l)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: unsupported format character '?' (0xa) at index 27
>>> print('%(screen_name)s;%(location)' % l)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: incomplete format
>>> print('%(screen_name)s\t%(location)s\n' % l)
JeffClark	Toronto

>>> for l in details:
...   f.write('%(screen_name)s\t%(location)s\n' % l)
... 
Traceback (most recent call last):
  File "<stdin>", line 2, in <module>
UnicodeEncodeError: 'ascii' codec can't encode character u'\xdc' in position 13: ordinal not in range(128)
>>> l
{u'follow_request_sent': False, u'profile_use_background_image': True, u'id': 12499512, u'description': u'VP Marketing, Fan Appz at http://www.fanappz.com. Also, NPR fanatic, free lecture geek & lover of all things Internet.', u'verified': False, u'profile_image_url_https': u'https://si0.twimg.com/profile_images/2624625376/467rr9rlthhw8wq166hx_normal.jpeg', u'profile_sidebar_fill_color': u'FFF7CC', u'geo_enabled': True, u'profile_text_color': u'0C3E53', u'followers_count': 3669, u'protected': False, u'location': u'\xdcT: 34.064306,-118.37251', u'profile_background_color': u'8B542B', u'id_str': u'12499512', u'status': {u'favorited': False, u'contributors': None, u'retweeted_status': {u'favorited': False, u'contributors': None, u'truncated': False, u'text': u'Bootstrap creators leave Twitter for Obvious and GitHub but vow to keep working on open-source project http://t.co/FDZvyzWa by @robinwauters', u'created_at': u'Sat Sep 29 10:50:16 +0000 2012', u'retweeted': False, u'in_reply_to_status_id_str': None, u'coordinates': None, u'id': 251997316620361728, u'source': u'<a href="http://spread.us" rel="nofollow">Spread The Next Web</a>', u'in_reply_to_status_id': None, u'place': None, u'id_str': u'251997316620361728', u'in_reply_to_screen_name': None, u'retweet_count': 545, u'geo': None, u'in_reply_to_user_id_str': None, u'possibly_sensitive': False, u'in_reply_to_user_id': None}, u'truncated': False, u'text': u'RT @TheNextWeb: Bootstrap creators leave Twitter for Obvious and GitHub but vow to keep working on open-source project http://t.co/FDZvy ...', u'created_at': u'Sat Sep 29 10:50:42 +0000 2012', u'retweeted': False, u'in_reply_to_status_id_str': None, u'coordinates': None, u'id': 251997425919750144, u'source': u'<a href="http://spread.us" rel="nofollow">Spread The Next Web</a>', u'in_reply_to_status_id': None, u'place': None, u'id_str': u'251997425919750144', u'in_reply_to_screen_name': None, u'retweet_count': 545, u'geo': None, u'in_reply_to_user_id_str': None, u'possibly_sensitive': False, u'in_reply_to_user_id': None}, u'utc_offset': -28800, u'statuses_count': 12640, u'default_profile_image': False, u'friends_count': 2568, u'profile_link_color': u'9D582E', u'profile_image_url': u'http://a0.twimg.com/profile_images/2624625376/467rr9rlthhw8wq166hx_normal.jpeg', u'notifications': False, u'profile_background_image_url_https': u'https://si0.twimg.com/profile_background_images/663059096/o8sgqjorqzfxtljnewpn.png', u'profile_banner_url': u'https://si0.twimg.com/profile_banners/12499512/1348008036', u'profile_background_image_url': u'http://a0.twimg.com/profile_background_images/663059096/o8sgqjorqzfxtljnewpn.png', u'screen_name': u'kristathomas', u'lang': u'en', u'following': False, u'profile_background_tile': True, u'favourites_count': 31, u'name': u'kristathomas', u'url': u'http://www.fanappz.com', u'created_at': u'Mon Jan 21 16:41:26 +0000 2008', u'contributors_enabled': False, u'time_zone': u'Pacific Time (US & Canada)', u'profile_sidebar_border_color': u'FFFFFF', u'default_profile': False, u'is_translator': False, u'listed_count': 174}
>>> l["location"]
u'\xdcT: 34.064306,-118.37251'
>>> u
u'\xdcT: 34.064306,-118.37251'
>>> u.encode("ascii")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
UnicodeEncodeError: 'ascii' codec can't encode character u'\xdc' in position 0: ordinal not in range(128)
>>> u.decode("unicode")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
LookupError: unknown encoding: unicode
>>> u.decode("utf8")
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/Library/Frameworks/Python.framework/Versions/2.7/lib/python2.7/encodings/utf_8.py", line 16, in decode
    return codecs.utf_8_decode(input, errors, True)
UnicodeEncodeError: 'ascii' codec can't encode character u'\xdc' in position 0: ordinal not in range(128)
>>> u.encode("ascii","ignore")
'T: 34.064306,-118.37251'
>>> u.encode("ascii","replace")
'?T: 34.064306,-118.37251'
>>> u.encode("ascii","replace")
'?T: 34.064306,-118.37251'
>>> sl=[]
>>> for d in details:
...   o={}
...   o["screen_name"]=d["screen_name"].encode("ascii","ignore")
...   o["location"]=d["location"].encode("ascii","ignore")
...   o["followers_count"]=str(d["followers_count"]
...   sl.append(o)
  File "<stdin>", line 6
    sl.append(o)
     ^
SyntaxError: invalid syntax
>>> o
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'o' is not defined
>>> o={}
>>> sl.append(o)
>>> sl
[{}]
>>> sl={}
>>> sl=[]
>>> for d in details:
...   o={}
...   o["followers_count"]=str(d["followers_count"]
...   o["location"]=d["location"].encode("ascii","ignore")
  File "<stdin>", line 4
    o["location"]=d["location"].encode("ascii","ignore")
    ^
SyntaxError: invalid syntax
>>> for d in details:
...   o={}
...   o["followers_count"]=str(d["followers_count"])
...   o["location"]=d["location"].encode("ascii","ignore")
...   o["screen_name"]=d["screen_name"].encode("ascii","ignore")
...   sl.append(o)
... 
>>> f
<open file 'sl.txt', mode 'w' at 0x1042314b0>
>>> for l in sl:
...   f.write('%(screen_name)s\t%(location)s\t%(followers_count)s' % l)
... 
>>> f.close()
>>> sl[0]
{'followers_count': '3354', 'location': 'Toronto', 'screen_name': 'JeffClark'}
>>> f=open("sl.txt","w")
>>> for l in sl:
...   f.write('%(screen_name)s\t%(location)s\t%(followers_count)s\n' % l)
... 
>>> f.close()
>>> 
>>> exec '/Applications/Octave.app/Contents/Resources/bin/octave'
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "<string>", line 1
    /Applications/Octave.app/Contents/Resources/bin/octave
    ^
SyntaxError: invalid syntax
>>> python
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'python' is not defined
>>> import networkx
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ImportError: No module named networkx
>>> 
