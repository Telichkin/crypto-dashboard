import { observable, computed, action } from "mobx";
import Api from "./Api";

export default class {
    @observable loading = true;
    @observable exchanges: {[name: string]: string} = {"": ""};
    @observable currentExchange: string = "";
    @observable exchangesIsOpened: boolean = false;

    constructor(private apiClient: Api) {
        this.apiClient.subscribe({
            onConnect: this.init,
            onUpdate: this.update,
        })
    }

    @action.bound init(exchanges: {[name: string]: string}) {
        this.update(exchanges);
        this.currentExchange = this.randomCurrentExchange;
        this.loading = false;
    }

    @action.bound update(exchanges: {[name: string]: string}) {
        this.exchanges = exchanges;        
    }

    private get randomCurrentExchange() {
        const exchangesNames = Object.keys(this.exchanges);
        const randomIndex = Math.floor(exchangesNames.length * Math.random());        
        return exchangesNames[randomIndex];
    }

    @computed get currentExchangeRate(): string {
        return this.exchanges[this.currentExchange];
    }

    @action.bound toggleExchangesList() {
        this.exchangesIsOpened = !this.exchangesIsOpened;
    }

    @action.bound changeCurrentExchange(exchangeName: string) {
        return () => {
            this.setCurrentExchange(exchangeName);
            this.toggleExchangesList();
        };
    }

    @action.bound setCurrentExchange(exchangeName: string) {
        this.currentExchange = exchangeName;
    }

}