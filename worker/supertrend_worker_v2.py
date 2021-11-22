import traceback
import json
import time
from datetime import datetime
import numpy as np
import warnings
import requests
import config
import schedule
import pandas as pd
pd.set_option('display.max_rows', None)
warnings.filterwarnings('ignore')


let_list = list(range(0, 99))

ini_array = np.array(let_list)
res = ini_array[::-1]


def addLogging(logDict: dict):
    loggingsFile = 'loggings.json'

    with open(loggingsFile) as f:
        data = json.load(f)

    data.append(logDict)

    with open(loggingsFile, 'w') as f:
        json.dump(data, f)


def currentTimeUTC():
    return datetime.now().strftime('%d/%m/%Y %H:%M:%S')


def tr(data):
    data['previous_close'] = data['close'].shift(1)
    data['high-low'] = abs(data['high'] - data['low'])
    data['high-pc'] = abs(data['high'] - data['previous_close'])
    data['low-pc'] = abs(data['low'] - data['previous_close'])

    tr = data[['high-low', 'high-pc', 'low-pc']].max(axis=1)

    return tr


def atr(data, period):
    data['tr'] = tr(data)
    atr = data['tr'].rolling(period).mean()

    return atr


def supertrend(df, period=7, atr_multiplier=3):
    hl2 = (df['high'] + df['low']) / 2
    df['atr'] = atr(df, period)
    df['upperband'] = hl2 + (atr_multiplier * df['atr'])
    df['lowerband'] = hl2 - (atr_multiplier * df['atr'])
    df['in_uptrend'] = True

    for current in range(1, len(df.index)):
        previous = current - 1

        if df['close'][current] > df['upperband'][previous]:
            df['in_uptrend'][current] = True
        elif df['close'][current] < df['lowerband'][previous]:
            df['in_uptrend'][current] = False
        else:
            df['in_uptrend'][current] = df['in_uptrend'][previous]

            if df['in_uptrend'][current] and df['lowerband'][current] < df['lowerband'][previous]:
                df['lowerband'][current] = df['lowerband'][previous]

            if not df['in_uptrend'][current] and df['upperband'][current] > df['upperband'][previous]:
                df['upperband'][current] = df['upperband'][previous]

    return df


in_position = False


def check_buy_sell_signals(df):
    global in_position

    print("checking for buy and sell signals")
    print(df.tail(5))
    last_row_index = len(df.index) - 1
    previous_row_index = last_row_index - 1

    if not df['in_uptrend'][previous_row_index] and df['in_uptrend'][last_row_index]:
        print("changed to uptrend, buy")
        if not in_position:
            print("BUY")
            addLogging({'timestamp': currentTimeUTC(),
                       'level': 'error', 'traceback': "BUY BITCH"})
            in_position = True
        else:
            print("already in position, nothing to do")

    if df['in_uptrend'][previous_row_index] and not df['in_uptrend'][last_row_index]:
        if in_position:
            print("changed to downtrend, sell")
            print("Sell")
            addLogging({'timestamp': currentTimeUTC(),
                       'level': 'error', 'traceback': "SELL BITCH"})
            in_position = False
        else:
            addLogging({'timestamp': currentTimeUTC(),
                       'level': 'error', 'traceback': "We are not in position BITCH"})
            print("You aren't in position, nothing to sell")


def run_bot():
    url = "http://localhost:8080/api/getFav"

    payload = {}
    headers = {
        'Content-Type':  'application/json',
        'X-AUTH-APIKEY': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F'
    }

    response = requests.request("GET", url, headers=headers, data=payload)
    json_data = response.json()
    
    print(json_data['data'])
    # for current in json_data:
    #     print(current['data'])
    


# print(f"Fetching new bars for {datetime.now().isoformat()}")
# url = config.urls2 + "/market_data/candles?pair=I-MANA_INR&interval=1m&limit=100"
# response = requests.get(url)
# data = response.json()
# df = pd.DataFrame(data[:-1], index=res, columns=['open', 'high',
#                   'low', 'close', 'volume', 'time'])
# df['time'] = pd.to_datetime(df['time'], unit='ms')
# df = df.sort_values(by='time', ascending=True)
# supertrend_data = supertrend(df)
# check_buy_sell_signals(supertrend_data)


schedule.every(config.interval).seconds.do(run_bot)


while True:
    schedule.run_pending()
    time.sleep(1)
