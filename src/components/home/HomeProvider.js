import React, { useState, useEffect } from "react"

export const HomeContext = React.createContext()

export const HomeProvider = (props) => {
    const [locations, setLocations] = useState([])
    const [activities, setActivities] = useState([])
    const [locationsById, setLocationsById] = useState([])
    const [locationactivities, setLocationActivities] = useState([])
    // const [searchLocations, setLocations] = useState("")
    const [ userSearchTerms, setUserSearchTerms ] = useState([])



    // GET LOCATIONS
    const getLocations = () => {
        return fetch("http://localhost:8000/locations", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setLocations)
    }

    const addLocation = location => {
        return fetch("http://localhost:8000/locations", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(location)
        })
    }

    const deleteLocation = locationId => {
        return fetch(`http://localhost:8000/locations/${locationId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(getLocations)
    }


    // UPDATE LOCATIONS (HOME PAGE CARDS)
    const updateLocation = (home) => {
        return fetch(`http://localhost:8000/locations/${home.id}`, {
            method: "PUT",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(home)
        })
            .then(getLocations)
    }

    // GET ACTIVITIES
    const getActivities = () => {
        return fetch("http://localhost:8000/activities", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setActivities)
    }

    const addActivities = activity => {
        return fetch("http://localhost:8000/activities", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
        })
            .then(setActivities)
    }

    const getLocationActivities = (location_id) => {
        return fetch(`http://localhost:8000/locationactivities?location_id=${location_id}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setLocationActivities)
    }

    const addLocationActivities = activity => {
        return fetch("http://localhost:8000/locationactivities", {
            method: "POST",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(activity)
        })
            .then(setLocationActivities)
    }

    const getLocationById = (id) => {
        return fetch(`http://localhost:8000/locations/${id}` , {
            headers: {
                Authorization: `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json",
            }
            })
            .then(res => res.json())
            .then(setLocationsById)
    }



    //  const addPhotos = Photo => {
    //     return fetch("http://localhost:8000/photos", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(Photo)
    //     })
    //         .then(getPhotos)
    // }

    // const updatePhotos = (photo) => {
    //     return fetch(`http://localhost:8000/projects/${photo.id}`, {
    //         method: "PUT",
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(photo)
    //     })
    //         .then(getPhotos)
    // }


    return (
        <HomeContext.Provider value={{
            locations, activities, getLocations, addLocation, addActivities, getActivities, updateLocation, deleteLocation, userSearchTerms, setUserSearchTerms, getLocationActivities, locationactivities, addLocationActivities, getLocationById, locationsById
        }}>
            {props.children}
        </HomeContext.Provider>
    ) 
}