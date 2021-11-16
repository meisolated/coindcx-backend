import pandas as pd
import numpy as np
import config
import requests
pd.set_option('display.max_rows', None)

def get_supertrend(high, low, close, lookback, multiplier):

    # ATR

    tr1 = pd.DataFrame(high - low)
    tr2 = pd.DataFrame(abs(high - close.shift(1)))
    tr3 = pd.DataFrame(abs(low - close.shift(1)))
    frames = [tr1, tr2, tr3]
    tr = pd.concat(frames, axis=1, join='inner').max(axis=1)
    atr = tr.ewm(lookback).mean()

    # H/L AVG AND BASIC UPPER & LOWER BAND

    hl_avg = (high + low) / 2
    upper_band = (hl_avg + multiplier * atr).dropna()
    lower_band = (hl_avg - multiplier * atr).dropna()

    # FINAL UPPER BAND
    final_bands = pd.DataFrame(columns=['upper', 'lower'])
    final_bands.iloc[:, 0] = [x for x in upper_band - upper_band]
    final_bands.iloc[:, 1] = final_bands.iloc[:, 0]
    for i in range(len(final_bands)):
        if i == 0:
            final_bands.iloc[i, 0] = 0
        else:
            if (upper_band[i] < final_bands.iloc[i-1, 0]) | (close[i-1] > final_bands.iloc[i-1, 0]):
                final_bands.iloc[i, 0] = upper_band[i]
            else:
                final_bands.iloc[i, 0] = final_bands.iloc[i-1, 0]

    # FINAL LOWER BAND

    for i in range(len(final_bands)):
        if i == 0:
            final_bands.iloc[i, 1] = 0
        else:
            if (lower_band[i] > final_bands.iloc[i-1, 1]) | (close[i-1] < final_bands.iloc[i-1, 1]):
                final_bands.iloc[i, 1] = lower_band[i]
            else:
                final_bands.iloc[i, 1] = final_bands.iloc[i-1, 1]

    # SUPERTREND

    supertrend = pd.DataFrame(columns=[f'supertrend_{lookback}'])
    supertrend.iloc[:, 0] = [
        x for x in final_bands['upper'] - final_bands['upper']]

    for i in range(len(supertrend)):
        if i == 0:
            supertrend.iloc[i, 0] = 0
        elif supertrend.iloc[i-1, 0] == final_bands.iloc[i-1, 0] and close[i] < final_bands.iloc[i, 0]:
            supertrend.iloc[i, 0] = final_bands.iloc[i, 0]
        elif supertrend.iloc[i-1, 0] == final_bands.iloc[i-1, 0] and close[i] > final_bands.iloc[i, 0]:
            supertrend.iloc[i, 0] = final_bands.iloc[i, 1]
        elif supertrend.iloc[i-1, 0] == final_bands.iloc[i-1, 1] and close[i] > final_bands.iloc[i, 1]:
            supertrend.iloc[i, 0] = final_bands.iloc[i, 1]
        elif supertrend.iloc[i-1, 0] == final_bands.iloc[i-1, 1] and close[i] < final_bands.iloc[i, 1]:
            supertrend.iloc[i, 0] = final_bands.iloc[i, 0]

    supertrend = supertrend.set_index(upper_band.index)
    supertrend = supertrend.dropna()[1:]

    # ST UPTREND/DOWNTREND

    upt = []
    dt = []
    close = close.iloc[len(close) - len(supertrend):]

    for i in range(len(supertrend)):
        if close[i] > supertrend.iloc[i, 0]:
            upt.append(supertrend.iloc[i, 0])
            dt.append(np.nan)
        elif close[i] < supertrend.iloc[i, 0]:
            upt.append(np.nan)
            dt.append(supertrend.iloc[i, 0])
        else:
            upt.append(np.nan)
            dt.append(np.nan)

    st, upt, dt = pd.Series(
        supertrend.iloc[:, 0]), pd.Series(upt), pd.Series(dt)
    upt.index, dt.index = supertrend.index, supertrend.index

    return st, upt, dt


url = config.urls2 + "/market_data/candles?pair=I-CHR_INR&interval=1m"

response = requests.get(url)
data = response.json()
df = pd.DataFrame(data[:-1], columns=['time', 'open',
                  'high', 'low', 'close', 'volume'])
df['time'] = pd.to_datetime(df['time'], unit='ms')
df = df.sort_values(by='time',ascending=True)
print(get_supertrend(df['high'], df['low'], df['close'], 10, 3))
