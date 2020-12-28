import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
// import { PhotoContext } from "../photos/PhotoProvider";
// import "./location.css"


export const HomeForm = (props) => {
    const { addLocation, updateLocation, getLocation, locations } = useContext(HomeContext)
    // const { addPhotos, updatePhotos, getPhotos, photos} = useContext(PhotoContext)


   
    const [photo, setPhoto] = useState('')
    const [loading, setLoading] = useState(false)

   
    const [location, setLocation] = useState({})

    
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
        }
    }
    
    useEffect(() => {
        getLocation()
        // getPhotos()
    }, [])

    useEffect(() => {
        getLocationInEditMode()
    }, [locations])


    const constructNewlocation = () => {

        const userId = parseInt(localStorage.getItem("users"))


        if (editMode) {
            updateLocation({
                title: location.title,
                description: location.medium,
                photo: photo,
                time: location.time,
                id: location.id,
                userId: userId
            })
                .then(() => props.history.push("/home"))
        } else {
            addLocation({
                title: location.title,
                description: location.medium,
                photo: photo,
                time: location.time,
                user: userId
            })
                .then(() => props.history.push("/home"))
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
        // const url = file.url
        setPhoto(file.secure_url)
        setLoading(false)

        
        
    }
    
    // const saveImage = () => {
    //     const userId = parseInt(localStorage.getItem("users"))

    //         addPhotos({
    //             photo: image,
    //             link: location.link,
    //             userId: userId
    //         })
    //     }
        

    return (
        <>
        <form className="form--content">
            <fieldset>
                <h2 className="locationForm__title">{editMode ? "Update location" : "Create Card"}</h2>
                {editMode 
                ? (<div className="location__image">
                    <img src={location.imageURL} alt={location.title} style={{width: '300px', height:'300px'}} />
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
                    <textarea type="text" name="medium" id="medium" required autoFocus className="form-control" 
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