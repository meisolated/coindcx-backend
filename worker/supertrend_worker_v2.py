import time
from datetime import datetime
import numpy as np
import warnings
import logging
from tqdm import tqdm
import time
import requests
import config
import schedule
import pandas as pd
pd.set_option('display.max_rows', None)
warnings.filterwarnings('ignore')


let_list = list(range(0, 99))

ini_array = np.array(let_list)
res = ini_array[::-1]


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


def check_buy_sell_signals(df, inpositions, positions):

    print("checking for buy and sell signals")
    print(df.tail(5))
    last_row_index = len(df.index) - 1
    lengthp = len(df.index)
    previous_row_index = last_row_index - 1

    # send buy and sell signals to database
    url = "http://localhost:8080/api/postsignal"
    headers = {
        'X-AUTH-APIKEY': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
        'Content-Type': 'application/x-www-form-urlencoded'
    }

    if not df['in_uptrend'][previous_row_index] and df['in_uptrend'][last_row_index]:
        print("changed to uptrend, buy")
        if not inpositions:

            payload = f"market={positions['market']}&market_name={positions['market_name']}&pair={positions['pair']}&current_price={df['close'][last_row_index]}&type=Buy&status=new"
            response = requests.request(
                "POST", url, headers=headers, data=payload)
            res = response.json()
            if(res['status'] == "error"):
                print("Some Error With The API")
            
            print("BUY")

        else:
            print("already in position, nothing to do")

    if df['in_uptrend'][previous_row_index] and not df['in_uptrend'][last_row_index]:
        if inpositions:

            payload = f"market={positions['market']}&market_name={positions['market_name']}&pair={positions['pair']}&current_price={df['close'][last_row_index]}&type=Sell&status=approved"
            response = requests.request(
                "POST", url, headers=headers, data=payload)
            res = response.json()
            if(res['status'] == "error"):
                print("Some Error With The API")
            print("changed to downtrend, sell")
            print("Sell")

        else:
            print("You aren't in position, nothing to sell")


def run_bot():
    try:
        # get data from local server
        url = "http://localhost:8080/api/getFav"

        payload = {}
        headers = {
            'Content-Type':  'application/json',
            'X-AUTH-APIKEY': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F'
        }

        response = requests.request("GET", url, headers=headers, data=payload)
        json_data = response.json()
        # print(json_data)
        for all in json_data['data']:
            print(f"Fetching new bars for {datetime.now().isoformat()}")
            url = config.urls2 + \
                f"/market_data/candles?pair={all['pair']}&interval=1m&limit=100"
            response = requests.get(url)
            data = response.json()
            df = pd.DataFrame(data[:-1], index=res, columns=['open', 'high',
                              'low', 'close', 'volume', 'time'])
            df['time'] = pd.to_datetime(df['time'], unit='ms')
            df = df.sort_values(by='time', ascending=True)
            supertrend_data = supertrend(df)

            # get position data for that market
            url = "http://localhost:8080/api/getposition"
            payload = f"market_name={all['pair']}"
            headers = {
                'X-AUTH-APIKEY': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                'Content-Type': 'application/x-www-form-urlencoded'
            }
            response = requests.request(
                "POST", url, headers=headers, data=payload)
            positions = response.json()
            # print(positions['data'])

            try:
                if(positions['data'] != 'undefined'):
                    check_buy_sell_signals(supertrend_data, True, positions)
            except:
                positions = {
                    "market_name": all['market_name'], "pair": all['pair'], "market": all['market']}
                check_buy_sell_signals(supertrend_data, False, positions)
            # else:
            #     check_buy_sell_signals(supertrend_data, False, positions)

    except Exception as e:
        logging.error('Caught exception: ' + str(e))


schedule.every(config.interval).seconds.do(run_bot)


while True:

    schedule.run_pending()
    time.sleep(1)
    for i in tqdm(range(101),
                  desc="Loading…",
                  ascii=False, ncols=75):
        time.sleep(0.20)
