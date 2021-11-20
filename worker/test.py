import requests  # Install requests module first.
import pandas as pd
pd.set_option('display.max_rows', None)

# Replace 'SNTBTC' with the desired market pair.
url = "https://public.coindcx.com/market_data/candles?pair=I-MANA_INR&interval=1h&limit=48"

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['open', 'high',
                                      'low', 'close', 'volume', 'time'])

df['time'] = pd.to_datetime(df['time'], unit='ms')
close_list = df['close'].tolist()
# max = df['open'].apply(max)
close_max = max(close_list, key=lambda x: float(x))
close_min = min(close_list, key=lambda x: float(x))
print("Max :" + str(close_max))
print("Min :" + str(close_min))
