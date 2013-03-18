g1=open("resultg1.txt","r")
lines=g1.readlines()
g1.close()
min=float("infinity")
i=0
j=0
for l in lines:
	print ("line "+str(i))
	arr=l.split(" ")
	j=0
	for a in arr:
		j=j+1
		v=int(a)
		if(a<min):
			print(str(i)+" "+str(j)+" "+str(min))
			min=a
	i=i+1

print min