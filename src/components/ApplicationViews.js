import React from "react"
import { Route } from "react-router-dom"
import { HomeProvider } from "./home/HomeProvider"
import { HomeList } from "./home/HomeList";
import { HomeForm } from "./home/HomeForm";
import { ActivityForm } from "./home/ActivityForm";

export const ApplicationViews = () => {
    return (<>
        <HomeProvider>
                <Route exact path="/home" render={(props) => {
                    return <>
                        <HomeList history={props.history} />
                        </>
                }} />

                <Route exact path="/location/create" render={(props) => {
                    return <>
                        <HomeForm {...props} />
                        </>
                }} />

                <Route exact path="/activity/create" render={(props) => {
                    return <>
                        <ActivityForm {...props} />
                        </>
                }} />

                <Route path="/location/edit/:locationId(\d+)" render={(props) => {
                    return <HomeForm {...props} />
                }} />

                <Route path="/location/activities/:activityId(\d+)" render={(props) => {
                            return <HomeForm {...props} />
                        }} />
        </HomeProvider>

    </> )
}
