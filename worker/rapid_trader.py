import time
from datetime import datetime
import numpy as np
import warnings
from tqdm import tqdm
import time
import requests

import schedule
import pandas as pd
pd.set_option('display.max_rows', None)
warnings.filterwarnings('ignore')


let_list = list(range(0, 287))

ini_array = np.array(let_list)
ress = ini_array[::-1]


def currentTimeUTC():
    return datetime.now().strftime('%d/%m/%Y %H:%M:%S')


def run_bot():

    # get favs
    mainUrl = "http://localhost:8080/api"
    url = mainUrl + "/getfav"

    payload = {}
    headers = {
        'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F'
    }

    response = requests.request("GET", url, headers=headers, data=payload)

    markets = response.json()

    # get settings

    try:
        for all in markets['data']:

            # get fav

            # last 12hrs data
            url = f"https://public.coindcx.com/market_data/candles?pair={all['pair']}&interval={all['rt_interval']}&limit={all['rt_time']}"
            tr_time = all['rt_time'] - 1
            let_list = list(range(0, tr_time))

            ini_array = np.array(let_list)
            ress = ini_array[::-1]

            response = requests.get(url)
            data = response.json()

            df = pd.DataFrame(data[:-1], index=ress, columns=['open', 'high',
                                                              'low', 'close', 'volume', 'time'])
            df['time'] = pd.to_datetime(df['time'], unit='ms')
            df = df.sort_values(by='time', ascending=True)

            last = len(df.index)
            last_item = len(df.index) - 1
            min = df['close'].min()
            max = df['close'].max()
            dif = (max - min) / all['rt_dif']
            nwo = min + dif
            sell = max - dif
            buffer = (dif / 100) * all['rt_buffer']
            p_buffer = nwo + buffer
            n_buffer = nwo - buffer

            print("MIN : " + str(min))
            print("MAX : " + str(max))
            print("BUFFER : " + str(buffer))
            print("BUY AT : " + str(nwo))
            print("SELL AT : " + str(sell))
            print("CURRENT : " + str(df['close'][last_item]))
            # print(df.tail(5))

            # check if current is between
            is_between = df['close'][last_item] <= p_buffer
            print(is_between)
            print(all['market_name'])
            if(df['close'][last_item] <= n_buffer):
                # get positions
                url = mainUrl + "/getposition"

                payload = f"market_name={all['market_name']}&status=all"
                headers = {
                    'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                response = requests.request(
                    "POST", url, headers=headers, data=payload)

                positions = response.json()

                try:
                    positions = positions["data"]
                    for allPositions in positions:
                        if not (allPositions['position_cleared'] == "True"):
                            url = "http://localhost:8080/api/updateposition"
                            payload = f"id={allPositions['id']}&buy_price={nwo}&sell_price={sell}&can_buy=true&buffer={buffer}"
                            headers = {
                                'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                            response = requests.request(
                                "POST", url, headers=headers, data=payload)
                        else:
                            return

                except:
                    # now insert position
                    url = "http://localhost:8080/api/insertposition"

                    payload = f"market={all['market']}&buy_price={nwo}&sell_price={sell}&market_name={all['market_name']}&pair={all['pair']}&buffer={buffer}"
                    headers = {
                        'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                    response = requests.request(
                        "POST", url, headers=headers, data=payload)

            else:
                # get positions
                url = mainUrl + "/getposition"

                payload = f"market_name={all['market_name']}&status=all"
                headers = {
                    'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }

                response = requests.request(
                    "POST", url, headers=headers, data=payload)

                positions = response.json()

                try:
                    positions = positions["data"]
                    for allPositions in positions:
                        if not (allPositions['position_cleared'] == "True"):
                            url = "http://localhost:8080/api/updateposition"
                            payload = f"id={allPositions['id']}&buy_price={nwo}&sell_price={sell}&can_buy=false&buffer={buffer}"
                            headers = {
                                'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }

                            response = requests.request(
                                "POST", url, headers=headers, data=payload)
                        else:
                            print('oke')
                except:
                    # now insert position
                    url = "http://localhost:8080/api/insertposition"

                    payload = f"market={all['market']}&buy_price={nwo}&sell_price={sell}&market_name={all['market_name']}&pair={all['pair']}&buffer={buffer}"
                    headers = {
                        'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }

                    response = requests.request(
                        "POST", url, headers=headers, data=payload)
            print("\n________________________________________________________________________________________________\n")
    except:
        print("\n________________________________________________________________________________________________\n")
        # !-------------------------------------------------------------------------------------------------------------------------------
        # print("\n________________________________________________________________________________________________________________")
        # print("__________________________________________________PHASE 1_________________________________________________________\n")
        # # if @buy at is lower than current then
        # if(df['close'][last_item] < nwo):
        #     print("Current Price is below Buy At")
        #     # now get last 48hrs data
        #     let_list = list(range(0, 11))

        #     ini_array = np.array(let_list)
        #     res = ini_array[::-1]

        #     url = f"https://public.coindcx.com/market_data/candles?pair={all['pair']}&interval=4h&limit=12"

        #     response = requests.get(url)
        #     data = response.json()

        #     df = pd.DataFrame(data[:-1], index=res, columns=['open', 'high',
        #                                                      'low', 'close', 'volume', 'time'])
        #     df['time'] = pd.to_datetime(df['time'], unit='ms')
        #     df = df.sort_values(by='time', ascending=True)
        #     last_item = len(df.index) - 1
        #     min = df['close'].min()
        #     max = df['close'].max()
        #     dif = (max - min) / 4
        #     nwo = min + dif
        #     sell = max - dif
        #     buffer = (dif / 100) * 20
        #     p_buffer = nwo + buffer
        #     n_buffer = nwo - buffer

        #     print("MIN : " + str(min))
        #     print("MAX : " + str(max))
        #     print("BUFFER : " + str(buffer))
        #     print("BUY AT : " + str(nwo))
        #     print("SELL AT : " + str(sell))
        #     print("CURRENT : " + str(df['close'][last_item]))
        #     is_between = n_buffer <= df['close'][last_item] <= p_buffer
        #     print(is_between)

        #     print("\n________________________________________________________________________________________________________________")
        #     print("___________________________________________________PHASE 2________________________________________________________\n")

        # # if @buy at is lower than current then
        # if(df['close'][last_item] < nwo):
        #     print("Current Price is below Buy At")
        #     # now get last 48hrs data
        #     let_list = list(range(0, 23))

        #     ini_array = np.array(let_list)
        #     res = ini_array[::-1]

        #     url = f"https://public.coindcx.com/market_data/candles?pair={all['pair']}&interval=4h&limit=24"

        #     response = requests.get(url)
        #     data = response.json()

        #     df = pd.DataFrame(data[:-1], index=res, columns=['open', 'high',
        #                                                      'low', 'close', 'volume', 'time'])
        #     df['time'] = pd.to_datetime(df['time'], unit='ms')
        #     df = df.sort_values(by='time', ascending=True)
        #     last_item = len(df.index) - 1
        #     min = df['close'].min()
        #     max = df['close'].max()
        #     dif = (max - min) / 4
        #     nwo = min + dif
        #     sell = max - dif
        #     buffer = (dif / 100) * 20
        #     p_buffer = nwo + buffer
        #     n_buffer = nwo - buffer

        #     print("MIN : " + str(min))
        #     print("MAX : " + str(max))
        #     print("BUFFER : " + str(buffer))
        #     print("BUY AT : " + str(nwo))
        #     print("SELL AT : " + str(sell))
        #     print("CURRENT : " + str(df['close'][last_item]))
        #     is_between = n_buffer <= df['close'][last_item] <= p_buffer
        #     print(is_between)

        #     print("\n________________________________________________________________________________________________________________")
        #     print("_____________________________________________________END__________________________________________________________\n")

    # if is_between:
    #     # get alert testing
    #     url = "http://localhost:8080/api/postlog"

    #     payload = f'frm=I-MANA_INR&details=ConsiderBuy&message=nothing&type=INFO'
    #     headers = {
    #         'x-auth-apikey': 'Y4N47wcslRiDqzopGTmcpbtT70yR6Y5F',
    #         'Content-Type': 'application/x-www-form-urlencoded'
    #     }
    #     response = requests.request("POST", url, headers=headers, data=payload)
    #     print(response.text)


schedule.every(10).seconds.do(run_bot)


while True:

    schedule.run_pending()
    time.sleep(1)
    for i in tqdm(range(101),
                  desc="Loading…",
                  ascii=False, ncols=75):
        time.sleep(0.10)
