

nodes={}
edgesIn={}
edgesOut={}
explored={}
finishingTime={}
finishingHash={}
leader={}
leaders={}
nodeCount=0
nodeHash={}
t=0
s=0
i=0
n=""

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
    global n
    global e
    global edges
    global nodeCount
    global nodeHash
    
    edgesIn={}
    edgesOut={}
    explored={}
    finishingTime={}
    finishingHash={}
    leader={}
    leaders={}

    nodeCount=len(nodes.keys())

    for n in range(1,nodeCount+1):
        edgesIn[n]=[]
        edgesOut[n]=[]
        explored[n]=False
        finishingTime[n]=False
        finishingHash[n]=False
        leader[n]=[]

    print "data structures reinitialized."

    for e in edges:
        if e[1]!=e[0]:
            if e[1] not in edgesOut[e[0]]:
                edgesOut[e[0]].append(e[1])
            if e[0] not in edgesIn[e[1]]:
                edgesIn[e[1]].append(e[0])
    print "data loaded, locked and ready."
    


    # Pass 1
    for n in range(nodeCount,0,-1):
        if not explored[n]:
            #print "launching DFS in reverse order from node "+str(n)
            s=n;
            print "exploring ",n
            DFSr(n);

    print "pass 1 complete."
    
    for n in range(1,nodeCount+1):
        explored[n]=False
    print "explored reinitialized."

    # Pass 2

    for n in range(1,nodeCount+1):
        if not explored[finishingHash[n]]:
            s=finishingHash[n]
            leaders[s]=[]
            DFS(finishingHash[n]);

    print("pass 2 complete.")
    contradiction=False
    for l in leaders.keys():
        #print "SCC with leader "+str(l)+": "+str(len(leaders[l]))+" nodes."

        if (len(leaders[l])>1):
            print leaders[l]
            leaders[l].sort()
            for i in range(len(leaders[l])-1):
                if leaders[l][i]==leaders[l][i+1]:
                    print "contradiction found ("+str(leaders[l][i])+"). Sorry"
                    contradiction=True
                    break
        if contradiction:
            break
    if not contradiction:
        print "no contradiction found." 
        
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
    leaders[s].append(nodeHash[startVertex])
    for edgeOut in edgesOut[startVertex]:
        if not explored[edgeOut]:
            DFS(edgeOut)


import sys, thread, threading, time
from math import *
sys.setrecursionlimit(100000)   # don't know what I actually needed here
thread.stack_size(2**27)      # largest power of 2 that didn't give me an error, don't know what I needed

file="2satsimple.txt"
filehandle=open(file)
lines=filehandle.readlines()
filehandle.close()
length=int(lines[0])
#nodes=range(1,int(lines[0])+1)
#for n in nodes:
#    edgesIn[n]=[]
#    edgesOut[n]=[]
nodeCount=1
nodeHash={}

print "Data structures created."


print "data file read and closed."
edges=[]
for i in range(1,len(lines)):
    line=lines[i][:-1]
#    if(i%1000==0):
#        print ".",

    edge=line.split(" ")
    edge[0]=int(edge[0])
    edge[1]=int(edge[1])
    # we create nodes in the hash if that node has not been found. 
    # nodes maps the original nodes number to an ordered list (1 to n)

    if edge[0] not in nodes:
        nodes[edge[0]]=nodeCount
        nodeHash[nodeCount]=abs(edge[0])
        nodeCount=nodeCount+1
        nodes[-edge[0]]=nodeCount
        nodeHash[nodeCount]=abs(edge[0])
        nodeCount=nodeCount+1
        
    if edge[1] not in nodes:
        nodes[edge[1]]=nodeCount
        nodeHash[nodeCount]=abs(edge[1])
        nodeCount=nodeCount+1
        nodes[-edge[1]]=nodeCount
        nodeHash[nodeCount]=abs(edge[1])
        nodeCount=nodeCount+1
        
    n0=nodes[edge[0]]
    n1=nodes[edge[1]]
    nn0=nodes[-edge[0]]
    nn1=nodes[-edge[1]]

        # for each clause term 0 or term 1, we have
        # not term 0 implies term 1
        # not term 1 implies term 0

    edges.append([nn0,n1])
    edges.append([nn1,n0])

nodeCount=len(nodes.keys())
   
nodes={1:1,-1:2,2:3,-2:4,3:5,-3:6}
nodeHash={1:1,2:1,3:2,4:2,5:3,6:3}
edges=[[2,3],[4,1],[3,2],[1,4],[6,4],[3,5],[6,3],[4,5]]

t1 = threading.Thread( target = scc, args = () )   #  creates a thread to call my function   scc(graph)
begin = time.clock()
t1.start()      # start the scc thread
t1.join()       # and wait for it to finish
print time.clock() - begin

"""
nodeCount=nodeCount-1
    for n in range(1,nodeCount+1):
        explored[n]=False
        finishingTime[n]=False
        finishingHash[n]=False
        leader[n]=[]
"""