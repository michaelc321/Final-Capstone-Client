import React, { useContext, useEffect, useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { ActivityForm } from "./ActivityForm";
import "./Home.css";
import { HomeContext } from "./HomeProvider";

export const ActivityModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const { getLocationActivities, locationactivities} = useContext(HomeContext)

  const matchingId = locationactivities.map(locationactivityId => {
    if (locationactivityId.location_id === props.location.id) {
      return locationactivityId.activity.name + " "
    } else {
      return console.log("Didnt find anything!")
      }
    })

  useEffect(() => {
    getLocationActivities()
}, [])

    return (
      <Modal
      basic
      onClose={() => setOpen(false).then(() => props.history.push("/home#card-content"))}
      onOpen={() => {setOpen(true)
      }}
      open={open}
      size='small'
      trigger={<p>View Activity</p>}
      >
      <Header icon>
        <Icon name='volleyball ball' />
        Activities for <b><i>{props.location.title}</i></b>
      </Header>
      <div className="modal-content">
        <Modal.Content className="matchingId">
  
          {matchingId.map(id => {
            return <div className="matchId_text">{id}</div>
          })}
        
        </Modal.Content>
        <Modal
            trigger={<Button>Add Activity</Button>}
            header="Let's add some activities!"
            content={<ActivityForm {...props}/>}
            />
        <Modal.Actions className="modal-remove">
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> Close
            </Button>
        </Modal.Actions>
      </div>
    </Modal>
  )
}

