import requests  # Install requests module first.
import pandas as pd
pd.set_option('display.max_rows', None)
pd.set_option('display.max_columns', None)

url = "https://api.coindcx.com/exchange/ticker"

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['market', 'change_24_hour', 'high',
                  'low', 'volume', 'last_price', 'bid', 'ask' ])

for current in range(1,len(df.index)):
    if(df['market'][current] == 'CHRINR'):
        print(df['market'][current])
        print(df['change_24_hour'][current])
        print(df['high'][current])
        print(df['low'][current])
        print(df['volume'][current])
        print(df['last_price'][current])
        print(df['bid'][current])
        print(df['ask'][current])


# url = "https://api.coindcx.com/exchange/v1/markets_details"

# response = requests.get(url)
# data = response.json()
# df = pd.DataFrame(data[:-1], columns=['coindcx_name', 'base_currency_short_name', 'target_currency_short_name',
#                   'target_currency_name', 'base_currency_name', 'min_quantity', 'max_quantity', 'min_price', 'max_price', 'min_notional', 'base_currency_precision', 'target_currency_precision', 'step', 'order_types', 'symbol', 'ecode', 'max_leverage', 'max_leverage_short', 'pair', 'status'])

# for current in range(1, len(df.index)):
#     if(df['symbol'][current] == "CHRINR"):
#         print(df['coindcx_name'][current])
#         print(df['base_currency_short_name'][current])
#         print(df['target_currency_short_name'][current])
#         print(df['target_currency_name'][current])
#         print(df['base_currency_name'][current])
#         print(df['min_quantity'][current])
#         print(df['max_quantity'][current])
#         print(df['max_price'][current])
#         print(df['min_notional'][current])
#         print(df['base_currency_precision'][current])
#         print(df['target_currency_precision'][current])
#         print(df['step'][current])
#         print(df['order_types'][current])
#         print(df['symbol'][current])
#         print(df['ecode'][current])
#         print(df['max_leverage'][current])
#         print(df['max_leverage_short'][current])
#         print(df['pair'][current])
#         print(df['status'][current])