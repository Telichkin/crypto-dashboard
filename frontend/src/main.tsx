import React from "react";
import ReactDOM from "react-dom";
import Dashboard from "./Dashboard";
import DashboardView from "./DashboardView";
import Api from "./Api";

const dashboard = new Dashboard(new Api());

ReactDOM.render(
    <DashboardView model={dashboard}/>,
    document.getElementById("greet")
)
