g3=open("g3.txt","r")
lines=g3.readlines()
g3.close()

l0=lines[0].split(" ")
n=int(l0[0])
m=int(l0[1])
lines=lines[1:]
edges=[]
for l in lines:
	myLine=l[:-1]
	myLine=myLine.split(" ")
	edges.append(myLine)
infi=float("infinity")
a=[]
b=[]
for i in range(n):
	arr=[]
	for j in range(n):
		if(i==j):
			arr.append(0)
		else:
			arr.append(infi)
	a.append(arr)

for e in edges:
	a[int(e[0])-1][int(e[1])-1]=int(e[2])

for k in range(1,n):
	b=a[:]
	print(k)
	for i in range(n):
		for j in range(n):
			a[i][j]=min(b[i][j],b[i][k]+b[k][j])

r=open("resultg3.txt","w")
min=infi
for i in range(n):
	string=""
	for j in range(n):
		if a[i][j]<min:
			min=a[i][j]
		string=string+str(a[i][j])+" "
	string=string[:-1]+"\n"
	r.write(string)
r.close()
print min
