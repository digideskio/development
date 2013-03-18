

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
    global leaders
    global t
    global s
    global i
    global line
    global lines
    
    for n in nodes:
        edgesIn[n]=[]
        edgesOut[n]=[]
    
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
    for n in range(875714,0,-1):
        if not explored[n]:
            #print "launching DFS in reverse order from node "+str(n)
            s=n;
            DFSr(n);
    
    print "pass 1 complete."

    for n in range(1,875714+1):
        explored[n]=False
    print "explored reinitialized."
    
    # Pass 2
    
    for n in range(875714,0,-1):
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
filehandle=open("SCC.txt")
lines=filehandle.readlines()
filehandle.close()   
edges=[0]*len(lines)
maxN=0

for i in range(len(lines)):
        line=lines[i]
    #    if(i%1000==0):
    #        print ".",
        edge=line.split(" ")
        edge[0]=int(edge[0])
        edge[1]=int(edge[1])
        if edge[0]>maxN:
            maxN=edge[0]
        if edge[1]>maxN:
            maxN=edge[1]
        edges[i]=edge

nodes=range(1,maxN+1)
print "data file read."

t1 = threading.Thread( target = scc, args = () )   #  creates a thread to call my function   scc(graph)
for l in leaders.keys():
    print "SCC with leader "+str(l)+": "+str(len(leaders[l]))+" nodes."

t1.start()      # start the scc thread
t1.join()       # and wait for it to finish
print time.clock() - begin

