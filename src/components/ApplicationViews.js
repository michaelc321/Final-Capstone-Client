import React from "react"
import { Route } from "react-router-dom"
import { HomeProvider } from "./home/HomeProvider"
import { HomeList } from "./home/HomeList";
import { Home } from "./home/Home";

export const ApplicationViews = () => {
    return (<>
        <HomeProvider>
                <Route exact path="/home" render={(props) => {
                    return <>
                        <HomeList history={props.history} />
                        </>
                }} />
        </HomeProvider>
    </> )
}
