export interface SubscribtionCallbacks {
    onConnect: (exchanges: {[name: string]: string}) => void;
    onUpdate: (exchanges: {[name: string]: string}) => void;
}

export default class {
    subscribe(callbacks: SubscribtionCallbacks) {
        setTimeout(() => {
            callbacks.onConnect({"Coinsetter": "403 USD", "Huobi": "401 USD", "CCEX": "402 USD", "OKCoin": "402 USD"});
        }, 1000);
    }
}