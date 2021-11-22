import json
f = open('../config/config.json', "r")

data = json.loads(f.read())

urls1 = data['urls1']
urls2 = data['urls2']
api_key = data['api_key']
secret = data['secret']
language = 'python'
interval = 2

f.close
