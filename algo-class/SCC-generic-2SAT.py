

nodes=[]
edgesIn={}
edgesOut={}
explored={}
finishingTime={}
finishingHash={}
leader={}
leaders={}
t=0
s=0
i=0


def scc():
    global nodes
    global edgesIn
    global edgesOut
    global explored
    global finishingTime
    global finishingHash
    global leader
    global edge
    global leaders
    global t
    global s
    global i
    global line
    global lines
    
    for n in nodes:
        edgesIn[n]=[]
        edgesOut[n]=[]
    nodeCount=len(nodes)
    print "Data structures created."
    for edge in edges:
         if edge[1]!=edge[0]:
            if edge[1] not in edgesOut[edge[0]]:
                edgesOut[edge[0]].append(edge[1])
            if edge[0] not in edgesIn[edge[1]]:
                edgesIn[edge[1]].append(edge[0])
    print "data loaded, locked and ready."
    for n in nodes:
        explored[n]=False
        finishingTime[n]=False
        finishingHash[n]=False
        leader[n]=0
    
    # Pass 1
    for n in range(nodeCount,0,-1):
        if not explored[n]:
            #print "launching DFS in reverse order from node "+str(n)
            s=n;
            DFSr(n);
    
    print "pass 1 complete."

    for n in range(1,nodeCount+1):
        explored[n]=False
    print "explored reinitialized."
    
    # Pass 2
    
    for n in range(nodeCount,0,-1):
        if not explored[finishingHash[n]]:
            s=finishingHash[n]
            leaders[s]=[]
            DFS(finishingHash[n]);
    
    print("pass 2 complete.")
    

def DFSr(startVertex):
    global t
    global explored
    global finishingHash
    global finishingTime
    global edgeIn
    
    explored[startVertex]=True;
    for edgeIn in edgesIn[startVertex]:
        if not explored[edgeIn]:
            DFSr(edgeIn)
    t+=1;
    finishingTime[startVertex]=t;
    finishingHash[t]=startVertex;    

def DFS(startVertex):
    global explored
    global leader
    global leaders
    global edgeOut
    
    explored[startVertex]=True
    leader[startVertex]=s
    leaders[s].append(startVertex)
    for edgeOut in edgesOut[startVertex]:
        if not explored[edgeOut]:
            DFS(edgeOut)


import sys, thread, threading, time
from math import*



sys.setrecursionlimit(100000)   # don't know what I actually needed here
thread.stack_size(2**27)      # largest power of 2 that didn't give me an error, don't know what I needed
begin = time.clock()

print "opening file..."
filehandle=open("2sat6.txt")
lines=filehandle.readlines()
maxN=int(lines[0])
lines=lines[1:]
filehandle.close()   
edges=[0]*(2*len(lines))


for i in range(len(lines)):
        line=lines[i]
    #    if(i%1000==0):
    #        print ".",
        clause=line.split(" ")
        c0=clause[0]=int(clause[0])
        c1=clause[1]=int(clause[1])
        if(c0>0):
            n0=c0
            c0=c0+maxN
        else:
            c0=-c0
            n0=c0+maxN
        if(c1>0):
            n1=c1
            c1=c1+maxN
        else:
            c1=-c1
            n1=c1+maxN
        edges[2*i]=[n0,c1]
        edges[2*i+1]=[n1,c0]

nodes=range(1,2*maxN+1)
print "data file read."

t1 = threading.Thread( target = scc, args = () )   #  creates a thread to call my function   scc(graph)

t1.start()      # start the scc thread
t1.join()       # and wait for it to finish
print time.clock() - begin

contradiction=False

for l in leaders.keys():
    #print "SCC with leader "+str(l)+": "+str(len(leaders[l]))+" nodes."
    if(len(leaders[l])>1):
        for i in range(len(leaders[l])):
            leaders[l][i]=leaders[l][i]%maxN
        leaders[l].sort()
        for i in range(len(leaders[l])-1):
            if leaders[l][i]==leaders[l][i+1]:
                contradiction=True
                print "contradiction on term ",i
                break
        if contradiction==True:
            break

if contradiction==False:
    print "no contradiction found"
