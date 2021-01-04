import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
import "./Home.css"


export const HomeForm = (props) => {
    const { addLocation, updateLocation, getLocation, locations, addPhotos } = useContext(HomeContext)
   
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
        getLocation()
    }, [])
    
    useEffect(() => {
        getLocationInEditMode()
    }, [locations])
    
    
    const constructNewlocation = () => {
        
        const userId = parseInt(localStorage.getItem("users"))

        if (editMode) {
            if (location.title && location.description && location.time) {
            updateLocation({
                title: location.title,
                description: location.description,
                photo: editModeSlicedPhoto(),
                time: location.time,
                id: location.id,
                user: userId
            })
                .then(() => props.history.push("/home"))
            } else {
                window.alert("Please fill in all fields.")
            }
        } else {
            if (location.title && location.description && photo && location.time) {
            addLocation({
                title: location.title,
                description: location.description,
                photo: photo,
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
                    <div className="photo-select"><label className="form-group" for="locationImage">Select Photo</label></div>
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
                    defaultValue={location.name}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="size">Details: </label>
                    <textarea type="text" name="description" id="description" required autoFocus className="form-control" 
                    placeholder="Enter Text"
                    defaultValue={location.details}
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
                    <label htmlFor="locationLink">Website: </label>
                    <input type="text" name="link" id="locationLink" required autoFocus className="form-control" 
                    placeholder="Enter URL"
                    defaultValue={location.link}
                    onChange={handleControlledInputChange} />
                </div>
            </fieldset>
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