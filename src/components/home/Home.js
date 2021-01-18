import React, { useState, useContext, useEffect } from "react"
import { HomeContext } from "./HomeProvider";
import { ActivityModal } from "./ActivityModal";
import { Card, Icon, Image } from 'semantic-ui-react'
import "./Home.css"




export const Home = (props) => {
    const { deleteLocation, updateMain, deleteLocationActivities, locationactivities, getLocationActivities } = useContext(HomeContext)
    // Cut out part of unusable link, salvaged working part and added https
    const realphoto = 'https://' + props.location.photo.slice(31)
    const year = props.location.time.slice(0, 4)

console.log(locationactivities)

//   const matchingId = locationactivities.find(locationactivityId => {
//     if (locationactivityId.location_id === props.location.id) {
//      console.log(locationactivityId.id)
//       return locationactivityId.id
//     } else {
//       return console.log("Didnt find anything!")
//       }
//     })
// console.log(matchingId)

  const matchingId = locationactivities.find(locationactivities => locationactivities.location_id === props.location.id) || {}
  console.log(matchingId.id)
  
    useEffect(() => {
      getLocationActivities()
  }, [])


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
    <Card.Content extra className="extra">
      <a>
        <Icon name='volleyball ball' />
        <ActivityModal {...props}/>
      </a><strong className="spacer">|</strong>
    <button className="delete" onClick={() => deleteLocationActivities(matchingId.id).then(() => deleteLocation(props.location.id))}>Delete</button>
    <button className="edit"
        onClick={() => {
            props.history.push(`/location/edit/${props.location.id}`)
        }}>Edit</button>
    </Card.Content>
  </Card>
  </section>
)
    }