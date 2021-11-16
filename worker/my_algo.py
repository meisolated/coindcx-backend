import requests  # Install requests module first.
import pandas as pd
pd.set_option('display.max_rows', None)
# Replace 'SNTBTC' with the desired market pair.
url = "https://public.coindcx.com/market_data/candles?pair=I-CHR_INR&interval=1m&limit=1000"

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['time', 'open',
                  'high', 'low', 'close', 'volume'])
df['time'] = pd.to_datetime(df['time'], unit='ms')
print(df)


##
