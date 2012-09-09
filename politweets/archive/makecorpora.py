# -*- coding: utf-8 -*-
import codecs
import tweepy
import time
import json
import nltk
import re

tweets=[]
lastIds={}
corpora={}
words={}

outputFile="corpora.txt"
textFile="politweets.txt"
IdFile="politweetsIds.txt"
#n = datetime.datetime.now()

f = codecs.open(textFile, encoding='utf-8', mode='r')
tweets=f.readlines()
f.close()

#f = codecs.open(idFile,encoding='utf-8',mode='r')
#ids=f.read()
#f.close()
#lastIds=json.loads(ids)
time_format = "%Y-%m-%d %H:%M:%S"
byday=[]
for d in range(45):
	byday.append("")
	
accounts={"MLP":["MLP_officiel"],"Hollande":["fhollande"],"Sarkozy":["SARKOZY_2012"], "Joly":["evajoly"],"Bayrou":["bayrou"], "EELV":["EELV","CecileDuflot","JVPlace", "DominiqueVoynet","yjadot","julienbayou"], "UMP":["UMP","jeunesump","jf_cope", "FLefebvre_UMP","vpecresse","VRossoDebord","DeputeTardy","franckriester","lauredlr"], "PS":["partisocialiste","pierremoscovici","aurelifil","vincent_peillon","faureolivier", "frebsamen","marisoltouraine","najatvb","delphinebatho","vincentfeltesse"], "FN":["FN_officiel","FNJ_officiel"],"Modem":["modem","yannwehrling","democrates", "jlbennahmias"],"Libe":["libe_2012"],"Figaro":["LeFigaro_News"],"LeMonde":["lemonde_pol"], "TF1":["TF1News_Select"],"France TV":["Francetv2012"],"Melenchon":["Melenchon2012"], "FDG":["SauvageLaurence","IanBrossat","Dartigolles","FrontDeGauche","PlaceAuPeuple","leilachaibi"]}
for k in accounts.keys():
 	corpora[k]=""
 	words[k]=[]

for t in tweets:
    tw=t.split('\t')
    category=tw[0]
    corpora[category]+=tw[3]+'\n'
    d=datetime.datetime.fromtimestamp(time.mktime(time.strptime(tw[2], time_format)))
    diff=45-(n-d).days
    if diff in range(0,44):
		byday[diff]+=tw[3]+'\n'

pat1 = re.compile(r"(^|[\n ])(([\w]+?://[\w\#$%&~.\-;:=,?@\[\]+]*)(/[\w\#$%&~/.\-;:=,?@\[\]+]*)?)", re.IGNORECASE | re.DOTALL)
for c in corpora.keys():
    corpora[c]=pat1.sub(r'',corpora[c])


F=['au', 'aux', 'avec', 'ce', 'ces', 'dans', 'de', 'des', 'du', 'elle', 'en', 'et', 'eux', 'il', 'je', 'la', 'le', 'leur', 'lui', 'ma', 'mais', 'me', 'm\xc3\xaame', 'mes', 'moi', 'mon', 'ne', 'nos', 'notre', 'nous', 'on', 'ou', 'par', 'pas', 'pour', 'qu', 'que', 'qui', 'sa', 'se', 'ses', 'son', 'sur', 'ta', 'te', 'tes', 'toi', 'ton', 'tu', 'un', 'une', 'vos', 'votre', 'vous', 'c', 'd', 'j', 'l', '\xc3\xa0', 'm', 'n', 's', 't', 'y', '\xc3\xa9t\xc3\xa9', '\xc3\xa9t\xc3\xa9e', '\xc3\xa9t\xc3\xa9es', '\xc3\xa9t\xc3\xa9s', '\xc3\xa9tant', '\xc3\xa9tante', '\xc3\xa9tants', '\xc3\xa9tantes', 'suis', 'es', 'est', 'sommes', '\xc3\xaates', 'sont', 'serai', 'seras', 'sera', 'serons', 'serez', 'seront', 'serais', 'serait', 'serions', 'seriez', 'seraient', '\xc3\xa9tais', '\xc3\xa9tait', '\xc3\xa9tions', '\xc3\xa9tiez', '\xc3\xa9taient', 'fus', 'fut', 'f\xc3\xbbmes', 'f\xc3\xbbtes', 'furent', 'sois', 'soit', 'soyons', 'soyez', 'soient', 'fusse', 'fusses', 'f\xc3\xbbt', 'fussions', 'fussiez', 'fussent', 'ayant', 'ayante', 'ayantes', 'ayants', 'eu', 'eue', 'eues', 'eus', 'ai', 'as', 'avons', 'avez', 'ont', 'aurai', 'auras', 'aura', 'aurons', 'aurez', 'auront', 'aurais', 'aurait', 'aurions', 'auriez', 'auraient', 'avais', 'avait', 'avions', 'aviez', 'avaient', 'eut', 'e\xc3\xbbmes', 'e\xc3\xbbtes', 'eurent', 'aie', 'aies', 'ait', 'ayons', 'ayez', 'aient', 'eusse', 'eusses', 'e\xc3\xbbt', 'eussions', 'eussiez', 'eussent', '.', '#', '@', '?', '...', '!', "'", ',', '\\xe0', 'les', '-', '"', '\\u2019', ':', 'cette', '\\xe9', 'a', '\\xe8', ')', 'r', 'e', '\\xe7', "c'est", '\\xea', 'pr', '\\xbb', '\xc3\xa0', '%', '\\xab', '\xe2\x80\x99', 're', '/', 'via', '11', '\\xbb:', ']', '[', 'RT', '&', 'gt', ';', '#', '".', "'#", '+', '+,', '&#', '.@', '|', '\\xb4', '^', 'cc', '(#', '(', u'', u'\\xe0', u'\\xe9t\\xe9']



otherTokens={}
unique={}
t={}
f={}
for c in corpora.keys():
	t[c]=nltk.wordpunct_tokenize(corpora[c])
	f[c]=nltk.FreqDist(t[c])
	
for c in corpora.keys():
	
	otherTokens[c]=[]
	for d in corpora.keys():
		if d<>c:
			otherTokens[c].extend(t[d])
	otherTokens[c]=set(otherTokens[c])
	unique[c]=[]
	for w in f[c].keys():
		if w not in otherTokens[c]:
			unique[c].append(w)
mf={}
for c in corpora.keys():
	mf[c]=[]
	for k in f[c].keys():
		if k.lower().encode("unicode_escape") not in F:
			mf[c].append({"word":k,"freq":f[c][k]})
text={}
bigrams={}
bigram_measures = nltk.collocations.BigramAssocMeasures()
for c in corpora.keys():
	for i in range(len(t[c])):
		t[c][i]=t[c][i].encode("unicode_escape")

	text[c]=nltk.Text(t[c])
	finder = nltk.collocations.BigramCollocationFinder.from_words(text[c])
	finder.apply_word_filter(lambda w: w.lower() in F)
	bigrams[c]=finder.nbest(bigram_measures.raw_freq,10)
	
# il est temps de conclure et de sortir un fichier...

var={}
def notrouble(w): return ',' not in w and '\"' not in w
file="var NLP={\n"
for c in corpora.keys():
	var[c]=c+":{unique: \""
	var[c]=var[c]+filter(notrouble,(", ".join(unique[c])))
	var[c]=var[c]+"\", mostf:\""
	for i in range(10):
		if notrouble(mf[c][i]['word']):
			var[c]=var[c]+mf[c][i]['word']+", "
	var[c]=var[c][:-2]+"\", bigrams:\""
	for i in range(10):
		if notrouble(" ".join(bigrams[c][i])):
			var[c]=var[c]+" ".join(bigrams[c][i])+", "
	var[c]=var[c][:-2]+"\"},\n"
var[c]=var[c][:-2]

for c in var.keys():
	file=file+var[c]

file = file + "];"

f = codecs.open(outputFile, encoding='utf-8', mode='wb')
f.write(file)
f.close()