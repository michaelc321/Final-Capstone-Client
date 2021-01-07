import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { ActivityInfo } from "./ActivityInfo";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"

export const Activity = (props) => {
    console.log(props)

    return(
        <>
        <h1>{props.location.title}</h1>
        <h4>{props.location.time}</h4>
        <ActivityInfo {...props}/>
         </>
    )
}