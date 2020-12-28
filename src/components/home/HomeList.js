import React, { useContext, useEffect, useState } from "react"
import { HomeContext } from "./HomeProvider"
import { Home} from "./Home"
import { Button } from 'react-bootstrap';
import { Link } from "react-router-dom"
import { HomeSearch } from "./HomeSearch";

// import "./Mains.css"

export const HomeList = (props) => {

    const { locations, getLocation, searchTerms } = useContext(HomeContext)
    const [ userHome, setUserHome ] = useState([])


    console.log(locations)
    useEffect(() => {
        getLocation()
    }, [])


    // useEffect(() => {
    //     const matchingNames = locations.filter(location => location.title.toLowerCase().includes(searchTerms.toLowerCase()))
    //     setUserHome(matchingNames)
    // }, [searchTerms])

    useEffect(() => {
        const filter = locations.filter(l => l.user === parseInt(localStorage.getItem("users")))
        setUserHome(filter)
    }, [locations])
    
    return (
        <>
            <HomeSearch />
            <section className="header-btn">
                <div className="cursive">VacaPlus</div>
                {/* <img src={require()} style={{width: '120px', height: '120px'}} /> */}
                {/* <h1 className="title">VacaPlus<img src={require()} style={{width: '62px', height: '62px'}} /></h1> */}
                </section>
            <div className="mainBtnTop">
            <button class="mainBtn" onClick={() => props.history.push("/projects/create")}>
                Add Card
            </button>
            </div>
        <div className="main">
            <article className="mainList">
    {/* {userHome.map(home => <Home key={home.id} home={home}{...props}/>)
    } */}
    {locations.map(location => {
        return <Home
                key={location.id}
                location={location}
                {...props}
                />
    })}
            </article>
        </div>
        </>
    )
}

