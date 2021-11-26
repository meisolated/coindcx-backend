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


def run_bot():
    print("oke")

    # Replace 'SNTBTC' with the desired market pair.
    url = "https://public.coindcx.com/market_data/candles?pair=I-MANA_INR&interval=5m&limit=100"

    response = requests.get(url)
    data = response.json()

    df = pd.DataFrame(data[:-1], index=res, columns=['open', 'high',
                                                     'low', 'close', 'volume', 'time'])
    df['time'] = pd.to_datetime(df['time'], unit='ms')
    df = df.sort_values(by='time', ascending=True)

    last_item = len(df.index) - 1
    min = df['close'].min()
    max = df['close'].max()
    dif = (max - min) / 4
    nwo = min + dif
    sell = max - dif
    buffer = (dif / 100) * 20
    p_buffer = nwo + buffer
    n_buffer = nwo - buffer

    print("MIN : " + str(min))
    print("MAX : " + str(max))
    print("BUFFER : " + str(buffer))
    print("BUY AT : " + str(nwo))
    print("SELL AT : " + str(sell))
    print("CURRENT : " + str(df['close'][last_item]))

    # check if current is between
    is_between = n_buffer <= df['close'][last_item] <= p_buffer

    print(is_between)
    if is_between:
        # get alert testing
        url = "http://localhost:8080/api/postlog"

        payload = f'frm=I-MANA_INR&details=ConsiderBuy&message=nothing&type=INFO'
        headers = {
            'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
        response = requests.request("POST", url, headers=headers, data=payload)
        print(response.text)


schedule.every(20).seconds.do(run_bot)


while True:

    schedule.run_pending()
    time.sleep(1)
    for i in tqdm(range(101),
                  desc="Loading…",
                  ascii=False, ncols=75):
        time.sleep(0.2)
