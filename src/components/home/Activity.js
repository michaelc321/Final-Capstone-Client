import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"

export const Activity = (props) => {
    const { deleteLocation, updateMain } = useContext(HomeContext)


    return(
        <ol>
            <h1>{props.location.title}</h1>
            <h4>{props.location.time}</h4>
            <li>{props.location.activity}</li>
            <li></li>
            <li></li>
        </ol>
    )
}