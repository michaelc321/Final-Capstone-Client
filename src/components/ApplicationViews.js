import React from "react"
import { Route } from "react-router-dom"
import { HomeProvider } from "./home/HomeProvider"
import { HomeList } from "./home/HomeList";
import { HomeForm } from "./home/HomeForm";

export const ApplicationViews = () => {
    return (<>
        <HomeProvider>
                <Route exact path="/home" render={(props) => {
                    return <>
                        <HomeList history={props.history} />
                        </>
                }} />

                <Route exact path="/projects/create" render={(props) => {
                    return <>
                        <HomeForm {...props} />
                        </>
                }} />

                <Route path="/main/edit/:locationId(\d+)" render={(props) => {
                    return <HomeForm {...props} />
                }} />
        </HomeProvider>
    </> )
}
