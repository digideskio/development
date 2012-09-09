# -*- coding: latin-1 -*-
import codecs
import tweepy
import time
import json
import datetime

key="ppHAC64cJGBBlwIx9ES4fw"
secret="P6DfN32vTZDkSZfglYryXWStT3xJaOKaRUz8SszHQ"
access_token="14624309-G4FTU63rdlGEFPCJdKbN1qLcOwlRysTou06ZtYVto"
access_token_secret="rxVrryQdlcfZPuO8QrHal4DMj2tI9WHaNXhwSOGdSM"
auth = tweepy.OAuthHandler(key, secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

tweets=[]
textFile="politweetsFdg.txt"
output="poliFdg2.txt"
idFile="politweetsIdsF.txt"
print 'opening file. this may take a while...'
f=codecs.open(textFile,encoding='utf-8',mode='r')
tw=f.readlines()
f.close
print 'file read. %i records found.', (len(tw))
n = datetime.datetime.now()
time_format = "%Y-%m-%d %H:%M:%S"
tweetOld=[]

for t in tw:
    if(len(t.split('\t'))>2):
        d=datetime.datetime.fromtimestamp(time.mktime(time.strptime(t.split('\t')[2], time_format)))
        if(n-d).days<45:
            tweets.append(t)
        else:
            tweetOld.append(t)
            
print 'tweets filtered.'
print str(len(tweets))+' records kept.'
print str(len(tweetOld))+' records too old.'

print "encoding tweets"

f = codecs.open(output, encoding='utf-8', mode='wb')
for t in tweets:
 	f.write(t.replace("\n","")+"\n")
f.close()
