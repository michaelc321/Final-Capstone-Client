import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
// import { ActivityButton } from "./ActivityButton";
import { Button, Icon, Modal } from 'semantic-ui-react'
import "./Home.css"

export const ActivityForm = (props) => {
    const [open, setOpen] = React.useState(false)
    const { getActivities, getLocations, activities, addLocationActivities, locations, addActivities } = useContext(HomeContext)
    // const editMode = props.match.params.hasOwnProperty("locationId") 
    const [activity, setActivity] = useState({})
    const handleControlledInputChange = (event) => {
        const newactivity = Object.assign({}, activity)         
        newactivity[event.target.name] = event.target.value     
        setActivity(newactivity)                                
    }


    useEffect(() => {
        getLocations()
        getActivities()
    }, [])

    return (
        <>
        <form className="form--content">
            
            <fieldset>
                <div className="form-group">
                    <label htmlFor="activity">Activity Creation </label>
                    <input type="text" name="name" id="activityName" required autoFocus className="form-control" 
                    placeholder="Create activity"
                    defaultValue={activity.name}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>

            <button type="submit" onClick={() => window.location.reload()}
            onClick={evt => {
                    evt.preventDefault()
                    addActivities({
                        name: activity.name
                    })
                }}
                className="form-group btn btn-primary ml-3">
                Save New Activity
            </button>
            <fieldset>
                    <div className="form-group">
                        <select name="activity" className="form-control"
                            // value={location.name}
                            onChange={handleControlledInputChange}
                        >
                            <option value="0">Select Activity</option>
                            {
                                activities.map(a => {
                                    return <option key={a.id} value={a.id}>{a.name}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>

            <button type="submit" onClick={() => props.history.push("/home")}
                onClick={evt => {
                    evt.preventDefault()
                    addLocationActivities({
                        location_id: props.location.id,
                        activity_id: activity.activity
                    })
                }}
                className="form-group btn btn-primary ml-3">
                Add New Activity to Card
            </button>
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => {setOpen(true)}}
                size='small'
            ></Modal>
            <Modal.Actions className="modal-remove">
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove' /> Close
            </Button>
        </Modal.Actions>
        </form>
        </>
    )
    }