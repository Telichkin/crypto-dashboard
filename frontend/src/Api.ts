import { Socket } from "phoenix";

export interface SubscribtionCallbacks {
    onConnect: (exchanges: {[name: string]: string}) => void;
    onUpdate: (exchanges: {[name: string]: string}) => void;
    onError: () => void;
}

export default class {
    private host?: string = process.env.BACKEND_HOST || "localhost";
    private port?: string = process.env.BACKEND_PORT || "4000";

    constructor() { }

    subscribe(callbacks: SubscribtionCallbacks) {
        const socket = new Socket(`ws://${this.host}:${this.port}/socket`);
        socket.connect();

        const channel = socket.channel("exchange_rates");
        channel.on("exchange_rates", exchanges => callbacks.onUpdate(exchanges))
        channel.join()
            .receive("ok", exchanges => callbacks.onConnect(exchanges))
            .receive("error", () => callbacks.onError())
            .receive("timeout", () => callbacks.onError())
    }
}