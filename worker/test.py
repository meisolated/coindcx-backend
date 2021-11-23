import requests # Install requests module first.

url = "https://public.coindcx.com/market_data/candles?pair=I-MANA_INR&interval=1m" # Replace 'SNTBTC' with the desired market pair.

response = requests.get(url)
data = response.json()
print(data)
