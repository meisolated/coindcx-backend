import requests # Install requests module first.

url = "https://api.coindcx.com/exchange/ticker"


response = requests.get(url)
data = response.json()
print(data)