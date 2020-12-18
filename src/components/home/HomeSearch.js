import React, { useContext } from "react"
import { HomeContext } from "./HomeProvider"

export const HomeSearch = () => {
    const { setLocations } = useContext(HomeContext)

    return (
        <>
            <input className="search" type="text"
            onChange={(changeEvent) => {
                    setLocations(changeEvent.target.value)
                }
            }
             placeholder="Search..." 
             results="0" />
        </>
    )
}