import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import { VacaPlus } from "./components/VacaPlus.js"
import "./index.css"

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <VacaPlus />
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
)
