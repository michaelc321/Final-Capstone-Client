import React, { useState, useEffect } from "react"

export const HomeContext = React.createContext()

export const HomeProvider = (props) => {
    const [locations, setLocation] = useState([])
    const [activities, setActivity] = useState([])
    const [searchLocations, setLocations] = useState("")

    // GET LOCATIONS
    const getLocation = () => {
        return fetch("http://localhost:8000/locations/")
            .then(res => res.json())
            .then(setLocation)
    }
    // GET ACTIVITIES
    const getActivity = () => {
        return fetch("http://localhost:8000/activities/")
            .then(res => res.json())
            .then(setActivity)
    }

    return (
        <HomeContext.Provider value={{
            locations, activities, getLocation, getActivity
        }}>
            {props.children}
        </HomeContext.Provider>
    ) 
}