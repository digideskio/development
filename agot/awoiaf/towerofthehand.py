proxies = {'http': 'http://wsg-proxy.oecd.org:80'}
from pickle import *
from BeautifulSoup import *
from urllib2 import *
from json import *

urlstart="http://towerofthehand.com/reference/index/"
reference=[]
for i in range(26):
    url=urlstart+chr(i+97)+".html"
    filehandle=urlopen(url)
    html=filehandle.read()
    filehandle.close()
    soup=BeautifulSoup(html)
    for a in soup.findAll("table")[0].findAll("a"):
        ref=[a.contents[0],a.attrs[0][1]]
        if len(a.attrs)>1:
            ref.append(a.attrs[1][1])
        reference.append(ref)
    print "done with "+chr(i+97)
    
    