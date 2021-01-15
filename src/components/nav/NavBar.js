import React from "react"
import { Link } from "react-router-dom"
import { Input, Menu, Icon } from 'semantic-ui-react'
// import { HomeSearch } from "../home/HomeSearch";
// import { UserContext } from "../users/UserProvider";
import "./NavBar.css"

export const NavBar = (props) => {

    // const { users, getUsers } = useContext(UserContext)
    // const { users, getUsers } = useContext(UserContext)


    // useEffect(() => {
    //     getUsers()
    // }, [])

    return (
        <div className="colornavbar">
        <Menu secondary>
        <Menu.Menu position='right'>
          <Menu.Item>
            <p icon="" />
          </Menu.Item>
          <Icon className="logout-icon" name="sign out" />
        <Menu.Item
            name='logout'
            onClick={() => {localStorage.removeItem("users")
                            props.history.push({ pathname: "/" })
                                    }}
          />
        </Menu.Menu>
      </Menu>
      </div>
    )
}
