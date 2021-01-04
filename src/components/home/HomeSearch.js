import React, { useContext } from "react"
import { Input, Menu } from 'semantic-ui-react'
import { HomeContext } from "./HomeProvider"

export const HomeSearch = () => {
    const { setLocations } = useContext(HomeContext)

    return (
        <>
             <Input icon='search' placeholder='Search...' 
            onChange={
                (changeEvent) => {
                    setLocations(changeEvent.target.value)
                }
            }
             placeholder="Search..." 
             results="0" />
        </>
    )
}