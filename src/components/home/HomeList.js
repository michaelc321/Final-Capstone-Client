import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
import { Home} from "./Home"
import { HomeSearch } from "./HomeSearch";
import "./Home.css"
import { Button, Icon } from 'semantic-ui-react'


export const HomeList = (props) => {

    const { locations, getLocation, searchLocations } = useContext(HomeContext)
    const [ userHome, setUserHome ] = useState([])

    
    console.log(userHome)
    useEffect(() => {
        getLocation()
        console.log('1st one ran')
    }, [])
    
    
    useEffect(() => {
        const matchingNames = locations.filter(location => location.title.toLowerCase().includes(searchLocations.toLowerCase()))
        setUserHome(matchingNames)
        console.log('2nd one ran')
    }, [searchLocations])
    
    useEffect(() => {
        const filter = locations.filter(l => l.user === parseInt(localStorage.getItem("users")))
        setUserHome(filter)
        console.log('3rd one ran')
    }, [locations])
    
    
    return (
        <>
        <section className="top-content">
           <img className="main-img" src={require('./images/travel.png')} />
           <h1 className="main-title">VacaPlus</h1>
           <Button inverted color='blue'>
            <Icon name='angle double down' />
            <a href="#location-cards">Move to Content</a>
            </Button>
        </section>
        <section className="main-content" id="location-cards">
            <div className="search-add">
                <div>
                    <HomeSearch />
                </div>
                <div className="mainBtnTop">
                    <button class="mainBtn" onClick={() => props.history.push("/location/create")}>
                        Add Card
                    </button>
                </div>
            </div>
        <div className="main">
            <article className="mainList">
    {locations.map(location => {
        return <Home
                key={location.id}
                location={location}
                {...props}
                />
    })}
            </article>
        </div>
        </section>
        </>
    )
}

