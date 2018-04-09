import { Socket } from "phoenix";

export interface SubscribtionCallbacks {
    onConnect: (exchanges: {[name: string]: string}) => void;
    onUpdate: (exchanges: {[name: string]: string}) => void;
    onError: () => void;
}

export default class {
    private socket: Socket;
    private host?: string = process.env.BACKEND_HOST || "localhost";
    private port?: string = process.env.BACKEND_PORT || "4000";

    constructor() {
        this.socket = new Socket(`ws://${this.host}:${this.port}/socket`);
        this.socket.connect();
    }

    subscribe(callbacks: SubscribtionCallbacks) {
        const channel = this.socket.channel("exchange_rates");
        channel.on("exchange_rates", exchanges => callbacks.onUpdate(exchanges))
        channel.join()
            .receive("ok", exchanges => callbacks.onConnect(exchanges))
            .receive("error", () => callbacks.onError())
            .receive("timeout", () => callbacks.onError())
    }
}