import json

#with open('data/place_id.json', 'r+') as f:
    #tempwebsites = json.load(f)
#websites = tempwebsites['breweries']
#webdict = dict()
#for webs in websites:
    #if('website' in webs):
        #print(webs['name'])
        #print(webs['website'])
        #webdict[webs['name']] = webs['website']
#print(webdict)

#with open('data/breweries.json', 'r+') as f:
    #data = json.load(f)
    
#brews = data['breweries']
#for brew in brews:
    #if(brew['name'] in webdict):
        #brew['website'] = webdict[brew['name']]
    #else:
        #brew['website'] = ""
#print(brews)


with open('data/breweries.json', 'r+') as f:
    temp = json.load(f)
old = temp['breweries']
brewdict = dict()
for ind in old:
        #print(webs['name'])
        #print(webs['website'])
        brewdict[ind['name']] = ind['website']

with open('data/breweriesList.json', 'r+') as f:
    data = json.load(f)
output = []
brews = data['breweries']
for brew in brews:
    if(brew['name'] in brewdict):
        output.append(brew)
print(output)
