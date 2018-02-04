import json
import os,datetime,sys

file = sys.argv[1] + " (%d).json"
i=1
while os.path.isfile(file%i) :
	i+=1
i-=1
file = file % i
print file
mp = json.loads(open(file).read())
cont=0
cont1=0

f = {}

for i in mp:
	if int(mp[i]["plays"]) == 1 :
		cont1+=1
	if int(mp[i]["plays"]) > 0 :
		cont+=1
		f[i]=mp[i]
ex={"0":"foarte rar","1":"ocazional","2":"in timpul liber","3":"cu fiecare ocazie"}
for i in f:
	f[i]["exp"] = ex[str(f[i]["exp"])]
	for j in range(1,1+f[i]["plays"]):
		j=str(j)
		f[i][j]["start"] = datetime.datetime.fromtimestamp(int(f[i][j]["start"])/1000).strftime('%Y-%m-%d %H:%M:%S')
		f[i][j]["stop"]  = datetime.datetime.fromtimestamp(int(f[i][j]["stop"])/1000).strftime('%Y-%m-%d %H:%M:%S')
		de = int(float(f[i][j]["delta"]))
		val = "{} min {} sec".format(de/60 , de%60 ,prec=1 )
		f[i][j]["delta"] = val 	
# C:\Python27\python.exe ./jsonExport.py
with open("export.txt","w") as oo :
	oo.write(str(cont1)+"\n")
	oo.write(str(cont)+"\n\n")
	oo.write(json.dumps(f,indent=2).replace("\"","").replace(","," ,"))
