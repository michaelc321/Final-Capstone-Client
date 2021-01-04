import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"




export const Home = (props) => {
    const { deleteLocation, updateMain } = useContext(HomeContext)
    console.log(props.location.photo)
    // Cut out part of unusable link, salvaged working part and added https
    const realphoto = 'https://' + props.location.photo.slice(31)
    const year = props.location.time.slice(0, 4)
    console.log(realphoto)
    
return(
<section className="card-holder">
    <Card>
    <img src={realphoto} style={{width: '291px', height:'310px'}} />
    <Card.Content>
      <Card.Header>{props.location.title}</Card.Header>
      <Card.Meta>
        <span className='date'>Added in {year}</span>
      </Card.Meta>
      <Card.Description>
        {props.location.description}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='volleyball ball' />
        View Activities
      </a><strong className="spacer">|</strong>
    <button className="delete" onClick={() => deleteLocation(props.location.id)}>Delete</button>
    <button className="edit"
        onClick={() => {
            props.history.push(`/location/edit/${props.location.id}`)
        }}>Edit</button>
    </Card.Content>
  </Card>
  </section>
)
    }