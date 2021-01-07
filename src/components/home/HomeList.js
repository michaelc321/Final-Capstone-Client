import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
import { Home} from "./Home"
import { Activity } from "./Activity";
import { ActivityInfo } from "./ActivityInfo";
import { HomeSearch } from "./HomeSearch";
import { NavBar } from "../nav/NavBar";
import "./Home.css"
import { Button, Icon } from 'semantic-ui-react'


export const HomeList = (props) => {

    const { locations, getLocations, activities, getActivities, userSearchTerms } = useContext(HomeContext)

    const [ userHome, setUserHome ] = useState([])
    const [ userActivities, setUserActivities ] = useState([])

    
    console.log(userHome)
    console.log(userActivities)
    console.log(locations)
    console.log(activities)

    useEffect(() => {
        getLocations()
        getActivities()
        console.log('1st one ran')
    }, [])
    
    useEffect(() => {
        setUserHome(locations)
        setUserActivities(activities)
        console.log('3rd one ran')
    }, [locations, activities])


    useEffect(() => {
        const matchingNames = locations.filter(location => location.title.toLowerCase().includes(userSearchTerms.toString().toLowerCase()))
        setUserHome(matchingNames) 
        console.log('2nd one ran')
    }, [userSearchTerms])
    
    
    
    return (
        <>
        <div  id="home">
        <NavBar {...props} />
        </div>
        <section className="top-content">
           <img className="main-img" src={require('./images/travel.png')} />
           <h1 className="main-title">VacaPlus</h1>
           <div className="content-btn">
           <Button inverted color='blue'>
            <Icon name='angle double down' />
            <a href="#card-content">Move to Card Content</a>
            </Button>
            <Button inverted color='blue'>
            <Icon name='angle double down' />
            <a href="#activity-content">Move to Activities</a>
            </Button>
            </div>
        </section>
        <section className="main-content" id="card-content">
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
                {userHome.map(location => {
                    return <Home
                            key={location.id}
                            location={location}
                            {...props}
                            />
                })}
            </article>
        </div>
        <div className="move-btn">
        <Button inverted color='blue'>
            <Icon name='angle double down' />
            <a href="#activity-content">Move to Activities</a>
            </Button>
            </div>
        </section>
        <section className="footer-content" id="activity-content">
            <article className="mainList-activity">
            <div className="footerIcon-h1">
                <Icon name='volleyball ball' className="footer-h1" />
                Activities
            </div>
                <div className="activity-resize">
                    {userHome.map(location => {
                        return <Activity
                                key={location.id}
                                location={location}
                                {...props}
                                />
                    })}
                    {userActivities.map(activities => {
                    return <ActivityInfo
                            key={activities.id}
                            activities={activities}
                            {...props}
                            />
                })}
                </div>
            </article>
            <div className="move-btn">
            <Button inverted color='blue' className="move-btn">
            <Icon name='angle double up' />
            <a href="#home">Back to top</a>
            </Button>
            </div>
        </section>
        </>
    )
}

