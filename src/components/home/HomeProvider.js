import React, { useState, useEffect } from "react"

export const HomeContext = React.createContext()

export const HomeProvider = (props) => {
    const [locations, setLocation] = useState([])
    const [activities, setActivity] = useState([])
    const [searchLocations, setLocations] = useState("")

    // GET LOCATIONS
    const getLocation = () => {
        return fetch("http://localhost:8000/locations", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setLocation)
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
            .then(getLocation)
    }

    const deleteLocation = locationId => {
        return fetch(`http://localhost:8000/locations/${locationId}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(getLocation)
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
            .then(getLocation)
    }

    // GET ACTIVITIES
    const getActivity = () => {
        return fetch("http://localhost:8000/activities/")
            .then(res => res.json())
            .then(setActivity)
    }

    return (
        <HomeContext.Provider value={{
            locations, activities, getLocation, addLocation, getActivity, updateLocation, deleteLocation
        }}>
            {props.children}
        </HomeContext.Provider>
    ) 
}