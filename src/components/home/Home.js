import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


// import "./Main.css"


export const Home = (props) => {
    const { deleteLocation, updateMain } = useContext(HomeContext)
    console.log(props.location)
    
return(

    <section className="mainContent" key={props.location.id}>
    <h3 className="Main__name">{props.location.title}</h3>
    <p className="details">{props.location.time}</p>
    <p className="time">{props.location.description}</p>
    <p className="time">{props.location.photo}</p>
    {/* <a href={props.main.link}>
    <img className="imgURL" src={props.main.imageURL} />
    </a> */}
    <button onClick={() => deleteLocation(props.location.id)}>Delete</button>
    <button 
        onClick={() => {
            props.history.push(`/main/edit/${props.main.id}`)
        }}>Edit</button>
    </section>
)
    }