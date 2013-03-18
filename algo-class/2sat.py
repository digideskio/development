from math import *
from random import *

def check(clause):
	c0=clause[0]
	c1=clause[1]
	
	if(c0>0):
		if(a[c0-1]==1):
			return True
	else:
		if(a[(-c0)-1]==0):
			return True
	if(c1>0):
		if(a[c1-1]==1):
			return True
	else:
		if(a[(-c1)-1]==0):
			return True
	return False

def flip(clause):
	if random()>.5:
		c=abs(clause[0])-1
	else:
		c=abs(clause[1])-1
	a[c]=1-a[c]

f=open("2sat3.txt")
text=f.readlines()
f.close()
clauses=[]
n=int(text[0][:-1])
for line in text[1:]:
	c=line[:-1].split(" ")
	c[0]=int(c[0])
	c[1]=int(c[1])
	clauses.append(c)

l1=int(floor(log(n)/log(2)))
l2=2*n**2
a=[0]*n
sat=False
for i in range(l1):
	for k in range(n):
		if random()>.5:
			a[k]=1
		else:
			a[k]=0

	print i,"initial assignment completed"

	for j in range(l2):
		if (j%10000)==0:
			print ".",
		if (j%100000)==0:
			print
		sat=True
		for c in clauses:
			if not check(c):
				sat=False
				break
		if sat:
			print "found a good assignment"
			break
		else:
			flip(c)
	if sat:
		print "we're done here"
		break

if sat:
	print "yes"
else:
	print "there is no good assignment"

