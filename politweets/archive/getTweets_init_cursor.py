# -*- coding: latin-1 -*-
import codecs
import tweepy
import time
import json

key="ppHAC64cJGBBlwIx9ES4fw"
secret="P6DfN32vTZDkSZfglYryXWStT3xJaOKaRUz8SszHQ"
access_token="14624309-G4FTU63rdlGEFPCJdKbN1qLcOwlRysTou06ZtYVto"
access_token_secret="rxVrryQdlcfZPuO8QrHal4DMj2tI9WHaNXhwSOGdSM"
auth = tweepy.OAuthHandler(key, secret)
auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(auth)

tweets=[]
lastIds={}
corpora={}
textFile="politweetsFdg2.txt"
idFile="politweetsIdsFdg2.txt"

#accounts={"MLP":["MLP_officiel"],"Hollande":["fhollande"],"Sarkozy":["SARKOZY_2012"],"Joly":["evajoly"],"Bayrou":["bayrou"], "EELV":["EELV","CecileDuflot","JVPlace","DominiqueVoynet","yjadot","julienbayou"], "UMP":["UMP","jeunesump","jf_cope","FLefebvre_UMP","vpecresse","VRossoDebord","DeputeTardy","franckriester","lauredlr"],"PS":["partisocialiste","pierremoscovici","aurelifil","vincent_peillon","faureolivier","frebsamen","marisoltouraine","najatvb","delphinebatho","vincentfeltesse"],"FN":["FN_officiel","FNJ_officiel"],"Modem":["modem","yannwehrling","democrates","jlbennahmias"],"Libe":["libe_2012"],"Figaro":["LeFigaro_News"],"LeMonde":["lemonde_pol"],"TF1":["TF1News_Select"],"France TV":["Francetv2012"]"Melenchon":["Melenchon2012"],"FDG":["SauvageLaurence","IanBrossat","Dartigolles","FrontDeGauche","PlaceAuPeuple","leilachaibi"]}
#accounts={"Figaro":["LeFigaro_News"]}
#accounts={"Melenchon":["Melenchon2012"],"FDG":["SauvageLaurence","IanBrossat","Dartigolles","FrontDeGauche","PlaceAuPeuple","leilachaibi"]}
accounts={"FDG":["leilachaibi"]}
print "Getting tweets, cursor version.\nLetsa go!\n\n"

for category in accounts:
    print "New category: "+category
    print "============================================================="
    corpora[category]=""
    
    for account in accounts[category]:
        lastIds[account]=""
        print "trying to get tweets from "+account
        ok=-1
        nbTweets=0
        max_id=""
        while ok==-1:
            try:
                wait_period = 2
                if max_id=="":
                    cursor = tweepy.Cursor(api.user_timeline,screen_name=account,count=200,retry_limit=10, retry_delay=5)
                else:
                    print "we had a problem around tweet #" +max_id+". We'll take it from there."
                    cursor = tweepy.Cursor(api.user_timeline,screen_name=account,count=200,max_id=max_id,retry_limit=10, retry_delay=5)
                for t in cursor.items():
                    # here there could be some normalization of the tweet text.
                    if lastIds[account]=="":
                        lastIds[account]=t.id_str
                    tweet=category+"\t"+account+"\t"+str(t.created_at)+"\t"+t.text+"\t"+t.id_str;
                    tweets.append(tweet)
                    corpora[category]+=(t.text+"\n")
                    nbTweets+=1
                    print ".",
                    max_id=t.id_str
                    # there could be scoring here
                ok=0
                print "\n%i tweets appended" % (nbTweets)
            except tweepy.TweepError,e:
                if api.rate_limit_status()['remaining_hits']== 0:
                    status=api.rate_limit_status()
                    now = time.time() # UTC
                    when_rate_limit_resets = status['reset_time_in_seconds'] # UTC
                    sleep_time = when_rate_limit_resets - now
                    print 'Rate limit reached. Trying again in %i seconds' % (sleep_time)
                    time.sleep(sleep_time)
                    continue
                else:
                    print e.response, e.reason
                    print 'Encountered error. Trying again in %i seconds' % (wait_period)
                    time.sleep(wait_period)
                    wait_period *= 1.5
                    continue 

print "encoding tweets"
f = codecs.open(textFile, encoding='utf-8', mode='wb')
f.writelines(tweets)
f.close()
f=open(idFile,"wb")
f.write(json.dumps(lastIds))
f.close()
