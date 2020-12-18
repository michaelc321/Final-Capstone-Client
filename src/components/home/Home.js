import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
// import { Card, ListGroup, ListGroupItem } from 'react-bootstrap';


// import "./Main.css"


export const Home = (props) => {
    const { deleteMain, updateMain } = useContext(HomeContext)
    
return(

    <section className="mainContent" key={props.home.id}>
    <h3 className="Main__name">{props.main.name}</h3>
    <p className="details">{props.main.details}</p>
    <p className="time">{props.main.date}</p>
    <a href={props.main.link}>
    <img className="imgURL" src={props.main.imageURL} />
    </a>
    <button onClick={() => deleteMain(props.main.id)}>Delete</button>
    <button 
        onClick={() => {
            props.history.push(`/main/edit/${props.main.id}`)
        }}>Edit</button>
    </section>
)
    }