import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"

export const ActivityInfo = (props) => {
   console.log(props)
   const { activities } = useContext(HomeContext)
    return(
        <>
        <h1>{activities.title}</h1>
         </>
    )
}