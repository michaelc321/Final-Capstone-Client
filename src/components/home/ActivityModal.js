import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import "./Home.css";

export const ActivityModal = (props) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
      trigger={<p>View Activities</p>}
    >
      <Header icon>
        <Icon name='volleyball ball' />
        Activities for {props.location.title}
      </Header>
      <div className="modal-content">
        <Modal.Content>
            <p>
            {props.location.activity}
            </p>
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

