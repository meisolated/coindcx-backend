import requests

def main():
    resp = requests.get("https://api.cryptowat.ch/markets/kraken/btcinr/orderbook")
    orderbook = resp.json()['result']
    print(orderbook)

if __name__ == '__main__':
    main()