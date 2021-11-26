import requests  # Install requests module first.
import numpy as np
import pandas as pd

# Replace 'SNTBTC' with the desired market pair.
url = "https://public.coindcx.com/market_data/candles?pair=I-CRV_INR&interval=5m&limit=12"

response = requests.get(url)
data = response.json()

df = pd.DataFrame(data[:-1], columns=['open', 'high',
                                      'low', 'close', 'volume', 'time'])
df['time'] = pd.to_datetime(df['time'], unit='ms')
df = df.sort_values(by='time', ascending=True)

min = df['close'].min()
max = df['close'].max()
dif = (max - min) / 4
nwo = min + dif


print(nwo)
