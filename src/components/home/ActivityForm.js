import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
// import { ActivityButton } from "./ActivityButton";
import { Button } from 'semantic-ui-react'
import "./Home.css"

export const ActivityForm = (props) => {
    const { getActivities, activities, addActivities } = useContext(HomeContext)
    // const editMode = props.match.params.hasOwnProperty("locationId") 
    const [activity, setActivity] = useState({})
   console.log(activity)
    const handleControlledInputChange = (event) => {
        const newactivity = Object.assign({}, activity)         
        newactivity[event.target.name] = event.target.value     
        setActivity(newactivity)                                
    }


    return (
        <>
        <form className="form--content">
            <fieldset>
                <div className="form-group">
                    <label htmlFor="activity">Add Activity </label>
                    <input type="text" name="title" id="locationTitle" required autoFocus className="form-control" 
                    placeholder="Enter Text"
                    defaultValue={activity.title}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <handleClick />
            <button type="submit" onClick={() => props.history.push("/home")}
                onClick={evt => {
                    evt.preventDefault()
                    addActivities({
                        name: activity.title,
                        description: "filler",
                        date: "filler",
                        photo: "filler",
                        // user: userId
                    })
                }}
                className="form-group btn btn-primary ml-3">
                Save New Activity
            </button>
            <button onClick={() => props.history.push("/home")} className="form-group btn btn-primary ml-3">Cancel</button>
        </form>
        </>
    )
    }