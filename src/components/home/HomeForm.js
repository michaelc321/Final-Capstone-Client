import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
import { ActivityForm } from "./ActivityForm";
import { Button } from 'semantic-ui-react'
import "./Home.css"


export const HomeForm = (props) => {
    const { addLocation, updateLocation, getLocations,getActivities, locations, activities, addActivity } = useContext(HomeContext)
   
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false)

    const [location, setLocation] = useState({})

    // Allows .slice() of location.photo | Photo now renders in Edit mode.
    // TLDR: Gets Photo for Edit mode.
    const editModeSlicedPhoto = () => {
            if (location.photo === undefined) {
                console.log('Let me .slice() location.photo in edit mode!')
            } else {
                return "https://" + location.photo.slice(31)
            }
    }
    
    const editMode = props.match.params.hasOwnProperty("locationId") 
    
    const handleControlledInputChange = (event) => {

        const newlocation = Object.assign({}, location)         
        newlocation[event.target.name] = event.target.value 
        setLocation(newlocation)                                
    }
    
    const getLocationInEditMode = () => {
        if (editMode) {
            const locationId = parseInt(props.match.params.locationId)
            const selectedlocation = locations.find(c => c.id === locationId) || {}
            setLocation(selectedlocation)
            console.log(props)
        }
    }
    useEffect(() => {
        getLocations()
        getActivities()
    }, [])
    
    useEffect(() => {
        getLocationInEditMode()
    }, [locations])
    
    console.log(location)
    const constructNewlocation = () => {
        
        const userId = parseInt(localStorage.getItem("users"))

        if (editMode) {
            if (location.title && location.description && location.time && location.activity) {
            updateLocation({
                title: location.title,
                description: location.description,
                photo: editModeSlicedPhoto(),
                time: location.time,
                activity: parseInt(location.activity),
                // activity2: parseInt(location.activity2),
                // activity3: parseInt(location.activity3),
                id: location.id,
                user: userId
            })
                .then(() => props.history.push("/home"))
            } else {
                window.alert("Please fill in all fields.")
            }
        } else {
            if (location.title && location.description && photo && location.time && location.activity) {
            addLocation({
                title: location.title,
                description: location.description,
                photo: photo,
                activity: parseInt(location.activity),
                // activity2: parseInt(location.activity2),
                // activity3: parseInt(location.activity3),
                time: location.time,
                user: userId
            })
                .then(() => props.history.push("/home"))
        } else {
            window.alert("Please fill in all fields")
        }
        }
    }

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'Michael')
        setLoading(true)
        const res = await fetch(
            'https://api.cloudinary.com/v1_1/db1peeart/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const file = await res.json()
        setPhoto(file.secure_url)
        setLoading(false) 

    }
    
    return (
        <>
        <form className="form--content">
            <fieldset>
                <h2 className="locationForm__title">{editMode ? "Update location" : "Create Card"}</h2>
                {editMode 
                ? (<div className="location__image">
                    <img src={editModeSlicedPhoto()} alt={location.title} style={{width: '300px', height:'300px'}} />
                </div>) : (
                    <div className="form-group">
                    <div className="photo-select"><label className="form-group img-btn" for="locationImage" class="ui button">Select Image</label></div>
                    <input type="file" 
                            name="file" 
                            id="locationImage" 
                            required autoFocus 
                            className="form-control" 
                            placeholder="Upload an image"
                            onChange={uploadImage}
                            style={{display: 'none'}} />
                            {loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                <img src={photo} style={{width: '300px', height: '300px'}} alt="" />
                            )}
                </div>
                )}
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="locationTitle">Place Visited: </label>
                    <input type="text" name="title" id="locationTitle" required autoFocus className="form-control" 
                    placeholder="Enter Text"
                    defaultValue={location.title}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Details: </label>
                    <textarea type="text" name="description" id="description" required autoFocus className="form-control" 
                    placeholder="Enter Text"
                    defaultValue={location.description}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
            <input className="form-group" type="date" id="time" name="time"
            min="2020-01-01" max="2200-12-31" defaultValue={location.time} onChange={handleControlledInputChange}>     
            </input>
            </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="activity" className="form-control"
                            // value={activities.name}
                            onChange={handleControlledInputChange}
                        >
                            <option value="0">Activity Select</option>
                            {
                                activities.map(a => {
                                    return <option key={a.id} value={a.id}>{a.name}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                {/* <fieldset>
                    <div className="form-group">
                        <select name="activity" className="form-control"
                            value={activities.name}
                            onChange={handleControlledInputChange}
                        >
                            <option value="0">Activity Select</option>
                            {
                                activities.map(a => {
                                    return <option key={a.id} value={a.id}>{a.name}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <select name="activity" className="form-control"
                            value={activities.name}
                            onChange={handleControlledInputChange}
                        >
                            <option value="0">Activity Select</option>
                            {
                                activities.map(a => {
                                    return <option key={a.id} value={a.id}>{a.name}</option>
                                })
                            }
                        </select>
                    </div>
                </fieldset> */}

            
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewlocation()
                }}
                className="form-group btn btn-primary ml-3">
                {editMode ? "Save Updates" : "Save New location"}
            </button>
            <button onClick={() => props.history.push("/home")} className="form-group btn btn-primary ml-3">Cancel</button>
        </form>
        </>
    )
}