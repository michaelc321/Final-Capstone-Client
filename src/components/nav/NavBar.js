import React from "react"
import { Link } from "react-router-dom"
import { Input, Menu, Icon } from 'semantic-ui-react'
import { HomeSearch } from "../home/HomeSearch";
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <div className="colornavbar">
        <Menu secondary>
        <Menu.Item
          name='home'
          onClick={() => {props.history.push({ pathname: "/home" })}}
        />
        <Menu.Item
          name='activity'
          onClick={() => {props.history.push({ pathname: "/activity" })}}
        />
        <Menu.Item
          name='gallery'
          onClick={() => {props.history.push({ pathname: "/gallery" })}}
        />
        {/* <Menu.Menu position='right'>
            <img className="navbar-img" src={require('../home/images/VacaPlus.png')} />
        </Menu.Menu> */}
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
