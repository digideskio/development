import math
import itertools
import copy

tsp=open("TSP.txt","r")
lines=tsp.readlines()
tsp.close()

def distance(a,b):
   x0=cities[a][0]
   x1=cities[b][0]
   y0=cities[a][1]
   y1=cities[b][1]
   return math.sqrt((x0-x1)*(x0-x1)+(y0-y1)*(y0-y1))

def powerset(iterable):
    s = list(iterable)
    return itertools.chain.from_iterable(itertools.combinations(s, r) for r in range(len(s)+1))

def listToBits(iterable):
   bits=0
   for i in iterable:
      if i>0:
        bits=bits+(1<<(i-0))
   return bits


n=int(lines[0])
lines=lines[1:]
cities=[]
for l in lines:
   myLine=l[:-1]
   myLine=myLine.split(" ")
   cities.append([float(myLine[0]),float(myLine[1])])

dist=[]
for i in range(n):
   mydist=[]
   for j in range(n):
      mydist.append(distance(i,j))
   dist.append(mydist)


infi=float("infinity")
a={0:{0:0}}


s=range(1,n)

nb=0
ops=0
l=0
b=copy.deepcopy(a)
for s in powerset(range(1,n)):
    nb=nb+1
    if (nb%1000000)==0:
      print nb/1000000, "m combinations"
    myarr=[0]+list(s)
    bits=listToBits(myarr)
    m=len(myarr)
    if m>l:
      print "now dealing with sets of size",m
      l=m
      #print "A: ",a
      b=copy.deepcopy(a)
      #print "B: ",b
      a={0:{0:0}}
      #print "now A:",a
     

    #print m
    #print "current combinantion: ",myarr,"(",bits,")"
    #print "now dealing with ",myarr," ("+str(bits)+")"
    if(m>1):
        a[bits]={0:infi}
        for j in myarr[1:]:            
            mypath=infi
            sminusj=bits-(1<<(j))	 
            #print "j: "+str(j)+" -> s /j ~ ("+str(sminusj)+")"
            kmin=-1					    		
            for k in myarr:
                if(k!=j):
                    ops=ops+1
                    if (ops%1000000)==0:
                      print ops/1000000, "m operations"
                    #print "  ",str(k),": "+str(a[sminusj][k])+" + "+str(dist[j][k])
                    if (b[sminusj][k]+dist[k][j])<mypath:
                        mypath=(b[sminusj][k]+dist[k][j])
                        kmin=k
            a[bits][j]=mypath
            #print "A["+str(bits)+"]["+str(j)+"]=A["+str(sminusj)+"]["+str(kmin)+"] ("+str(a[sminusj][kmin])+")+ dist["+str(kmin)+"]["+str(j)+"] ("+str(dist[kmin][j])+")="+str(a[bits][j])
    #else:
    	#print "A["+str(bits)+"]["+str(j)+"]="+str(a[bits][j])
    #print "shortest paths for route ",s
    #print a[bits]

# final hop for the win
#finalTSP=infi
print a[bits]
for j in range(1,n):
    lasthop=a[bits][j]+dist[j][0]
    if lasthop<finalTSP:
        finalTSP=lasthop

print finalTSP