import React, { useContext, useEffect, useState } from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import "./Home.css";
import { HomeContext } from "./HomeProvider";

export const ActivityModal = (props) => {
  const [open, setOpen] = React.useState(false)
  const { getLocationActivities, locationactivities, getLocationById, getLocations, locations, locationsById } = useContext(HomeContext)


  useEffect(() => {
    getLocationById(props.location.id)
    // getLocationActivities(props.location.id)
}, [])

console.log(props)


console.log(locationactivities)
  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<p>View Activity</p>}
    >
      <Header icon>
        <Icon name='volleyball ball' />
        Activities for {props.location.title}
      </Header>
      <div className="modal-content">
        <Modal.Content>
        {props.location.activity.name}
        </Modal.Content>
        <Modal.Actions className="modal-remove">
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> Close
            </Button>
        </Modal.Actions>
      </div>
    </Modal>
  )
}

