import React, { useEffect, useContext, useState } from "react"
import DefaultProfileImage from "./default_profile_image.jpg"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"
import { PostContext } from "../posts/PostProvider"
import { SubscribeButton } from "./SubscribeButton"
import "./User.css"

export const UserProfile = (props) => {
    const { getUserProfile } = useContext(UserContext)
    const { getPosts, posts } = useContext(PostContext)
    const [profile, setProfile] = useState({})
    const [image, setImage] = useState(DefaultProfileImage)
    const [DD, setDD] = useState("00")
    const [MM, setMM] = useState("00")
    const [YYYY, setYYYY] = useState("0000")
    const [postCount, setPostCount] = useState(0)
    const [plural, setPlural] = useState("")

    useEffect(() => {
        const userId = parseInt(props.match.params.userId)
        getUserProfile(userId)
        .then(setProfile)
        .then(getPosts)
    }, [])

    useEffect(()=>{
        if(profile !== {} && posts !== []){
            const count = posts.filter(p => p.rareuser.id === profile.id).length
            setPostCount(count)
        }
    },[posts])

    useEffect(()=>{
        if(postCount === 0){
            setPostCount(null)
        }
        if(postCount === 1){
            setPlural("post")
        }
        if(postCount > 1){
            setPlural("posts")
        }
    }, [postCount])

    useEffect(()=> {
        if(profile !== {} && profile.date_joined !== undefined){
            const date = profile.date_joined.split('T')[0]
            const [year, month, day] = date.split('-')
            const [dayOne, dayTwo] = day.split('')
            const [monthOne, monthTwo] = month.split('')
            if(dayOne === "0"){
                setDD(dayTwo)
            }
            else{
                setDD(day)
            }
            if(monthOne === "0"){
                setMM(monthTwo)
            }
            else {
                setMM(month)
            }
            setYYYY(year)
        }
    }, [profile])

    return (
        <div className="profile-container">
        <div className="left-spacer"></div>
        <article className="profile">

            <SubscribeButton profile={profile} {...props} />

            <div className="top">
                <section className="profile__info-left">
                    <div className="profile__img">
                        <img className="image" alt="" src={profile.profile_image_url} />
                    </div>
                    <div className="profile__name">
                        {profile.full_name}
                    </div>
                </section>

                <section className="profile__info-right">
                    <div className="profile__username">
                        @{profile.username}
                    </div>
                    <div className="profile__email">
                        <p className="email">
                        {profile.email}
                        </p>
                    </div>
                    <div className="profile__datejoin">
                        <p className="mem-since">
                        member since: {MM}-{DD}-{YYYY}
                        </p>
                    </div>
                    <div className="profile__type">
                        {profile.is_staff
                        ? "admin"
                        : "author"
                    }
                    </div>
                    <Link
                    title={`Click to view posts by ${profile.username}`}
                    className="profile__articles"
                    to={{ pathname: `/posts/user/${profile.id}`,
                    state: {userId: `${profile.id}`,
                    name:`${profile.username}`}}} >
                        {postCount} {plural}
                    </Link>
                </section>
            </div>
            <div className="bottom profile__bio">
                {profile.bio}
            </div>
        </article>
        <div className="right-spacer"></div>
        </div>
    )
}