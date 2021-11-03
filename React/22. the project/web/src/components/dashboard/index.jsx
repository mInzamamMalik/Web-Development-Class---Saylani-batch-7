import axios from 'axios';
import { useState, useEffect, useRef } from "react"
import { baseUrl } from "./../../core"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";

function Home() {

    let { state, dispatch } = useContext(GlobalContext);

    const [profile, setProfile] = useState({})

    useEffect(() => {

        axios.get(`${baseUrl}/api/v1/profile`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setProfile(res.data)
            })
    }, [])


    return (
        <>
            <h1> Profile Page </h1>
            <p>{JSON.stringify(profile)}</p>

            <button onClick={() => {
                axios.get(`${baseUrl}/api/v1/profile`, {
                    withCredentials: true
                })
                    .then((res) => {
                        console.log("res +++: ", res.data);
                        setProfile(res.data)
                    })
            }} >get profile</button>

            <button onClick={() => {
                axios.post(`${baseUrl}/api/v1/logout`,{}, {
                    withCredentials: true
                })
                    .then((res) => {
                        console.log("res +++: ", res.data);

                        dispatch({
                            type: "USER_LOGOUT"
                        })
                    })
            }} >Logout</button>
        </>
    );
}

export default Home;