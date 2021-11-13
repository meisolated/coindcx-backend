import requests # Install requests module first.
import pandas  as pd 
import numpy as np
from datetime import datetime   

url = "https://public.coindcx.com/market_data/candles?pair=B-BTC_USDT&interval=1m&limit=50" # Replace 'SNTBTC' with the desired market pair.

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['time', 'open', 'high', 'low', 'close', 'volume'])
df['time'] = pd.to_datetime(df['time'], unit='ms')

print(df)