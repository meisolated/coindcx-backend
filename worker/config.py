import json
f = open('../config.json', "r")

data = json.loads(f.read())

urls1 = data['urls1']
urls2 = data['urls2']

f.close
