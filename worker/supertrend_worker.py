import warnings
import config
from datetime import datetime
import numpy as np
import requests  # Install requests module first.
import pandas as pd
pd.set_option('display.max_rows', None)
warnings.filterwarnings('ignore')

# Replace 'SNTBTC' with the desired market pair.
url = config.urls2 + "/market_data/candles?pair=I-CHR_INR&interval=5m&limit=100"

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['time', 'open',
                  'high', 'low', 'close', 'volume'])
df['time'] = pd.to_datetime(df['time'], unit='ms')
df = df.sort_values(by='time',ascending=True)


def tr(df):
    df['previous_close'] = df['close'].shift(1)
    df['high-low'] = abs(df['high'] - df['low'])
    df['high-pc'] = abs(df['high'] - df['previous_close'])
    df['low-pc'] = abs(df['low'] - df['previous_close'])
    tr = df[['high-low', 'high-pc', 'low-pc']].max(axis=1)

    return tr


def atr(df, period):
    df['tr'] = tr(df)
    print("calculate average true range")

    the_atr = df['tr'].rolling(period).mean()
    return the_atr


def supertrend(df, period=7, atr_multiplier=3):
    hl2 = (df['high'] + df['low']) / 2
    df['atr'] = atr(df, period)
    df['upperband'] = hl2 + (atr_multiplier * df['atr'])
    df['lowerband'] = hl2 - (atr_multiplier * df['atr'])
    df['in_uptrend'] = True

    for current in range(1, len(df.index)):
        previous = current - 1
        if(df['close'][current] > df['upperband'][previous]):
            df['in_uptrend'][current] = True
        elif df['close'][current] < df['lowerband'][previous]:
            df['in_uptrend'][current] = False
        else:
            df['in_uptrend'][current] = df['in_uptrend'][previous]

            if df['in_uptrend'][current] and df['lowerband'][current] < df['lowerband'][previous]:
                df['lowerband'][current] = df['lowerband'][previous]

            if not df['in_uptrend'][current] and df['upperband'][current] > df['upperband'][previous]:
                df['upperband'][current] = df['upperband'][previous]

    print(df)


supertrend(df)
