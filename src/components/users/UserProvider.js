import React, { useState } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {

    const [users, setUsers] = useState([])
    const [currentUser, setCurrentUser] = useState({})
    const [loggedIn, setLoggedIn] = useState(false)
    const [currentUserProfile, setCurrentUserProfile] = useState({})
    const [currentUserSubscriptions, setCurrentUserSubscriptions] = useState([])
    const [activeSubscriptions, setActiveSubscriptions] = useState([])
    const [followedAuthors, setFollowedAuthors] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8000/users", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setUsers)
    }

    const getCurrentUser = () => {
        return fetch("http://localhost:8000/users/current_user", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(setCurrentUser)
    }

    const getUserProfile = (userId) => {
        return fetch(`http://localhost:8000/users/${userId}`, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("users")}`,
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())

    }

    return (
        <UserContext.Provider value={{
            users, getUsers, currentUser, getCurrentUser, getUserProfile, loggedIn, setLoggedIn, setCurrentUser, currentUserProfile, setCurrentUserProfile, currentUserSubscriptions, setCurrentUserSubscriptions, setActiveSubscriptions, setFollowedAuthors, followedAuthors, activeSubscriptions
        }}>
            {props.children}
        </UserContext.Provider>
    )
}
