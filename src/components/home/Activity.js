import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"

export const Activity = (props) => {
    
    console.log("activity")
    console.log(props.location.activity.name)

    const data = [props.location.activity.name]
    return(
        <>
        <div className="activity-info">
            <div><h1>{props.location.title}</h1></div>
            <h4>{props.location.time}</h4>
            {
           data.map(a => {
                return <p>{a}</p>
            })
        }
            
            {/* <p>{props.location.activity.name}</p> */}
        </div>
        </>
    )
}