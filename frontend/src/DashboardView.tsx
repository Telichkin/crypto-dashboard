import * as React from "react";
import { observer } from "mobx-react";
import Dashboard from "./Dashboard";

@observer
export default class extends React.Component<{ model: Dashboard }, {}> {
    render() {
        const model = this.props.model;

        return (
            <div className="dashboard">
                <h1 className="dashboard__title">Hi ETH! What is your exchange rate?</h1>
                {model.loading ? this.renderLoading() : this.renderLoaded()}             
            </div>    
        )
    }

    renderLoading() {
        return (
            <div className="dashboard__description">
                {"Wait a sec I'm thinking..."}
            </div>
        )
    }

    renderLoaded() {
        const model = this.props.model;

        return (
            <div className="dashboard__description">
                {"My exchange rate at "}
                <div className="dashboard__exchange">
                    <span 
                        className="dashboard__echange-name"
                        onClick={model.toggleExchangesList}
                    >
                        {model.currentExchange}
                    </span>
                    {model.exchangesIsOpened && this.renderExchanges()}
                </div>
                {" is "}<span className="dashboard__exchange-rate">{`${model.currentExchangeRate} for 1 ETH`}</span>
            </div>  
        )
    }

    renderExchanges() {
        const model = this.props.model;

        return (
            <div className="available-exchanges">
                <ul className="available-exchanges__list">
                    {model.exchangesNames.map((exchangeName: string) => (
                        <li 
                            className="available-exchanges__item"
                            key={exchangeName}
                            onClick={model.changeCurrentExchange(exchangeName)}
                        >
                            {exchangeName}
                        </li>
                    ))}
                </ul> 
            </div>
        )
    }
}