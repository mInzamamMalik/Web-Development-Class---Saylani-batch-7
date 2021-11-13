import axios from 'axios';
import { useState, useEffect, useRef } from "react"
import { baseUrl } from "./../../core"
import { GlobalContext } from './../../context/Context';
import { useContext } from "react";
import Post from "./post"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';


function Dashboard() {
    const [inputText, setInputText] = useState("");
    let { state, dispatch } = useContext(GlobalContext);

    const [posts, setPosts] = useState([])
    const [refresh, setRefresh] = useState(false)
    const [isMore, setIsMore] = useState(true)

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/posts?page=0`, {
            withCredentials: true
        })
            .then((res) => {
                console.log("res +++: ", res.data);
                setPosts(res.data)

            })
    }, [])

    useEffect(() => {
        const socket = io("http://localhost:5001"); // to connect with locally running Socker.io server

        socket.on('connect', function () {
            console.log("connected to server")
        });
        socket.on('disconnect', function (message) {
            console.log("disconnected from server: ", message);
        });
        socket.on('POSTS', function (data) {
            console.log(data);
            setPosts((prev) => [data, ...prev])
        });

        return () => {
            socket.close();
        };
    }, []);

    const loadMore = () => {
        axios.get(`${baseUrl}/api/v1/posts?page=${posts.length}`,
            {
                withCredentials: true
            })
            .then((res) => {
                console.log("res +++: ", res.data);
                if (res.data?.length) {
                    const newPosts = [...posts, ...res.data]
                    setPosts(newPosts)
                } else {
                    setIsMore(false)
                }
            })
    }


    const submit = () => {
        if (inputText !== "") {
            axios.post(`${baseUrl}/api/v1/post`, {
                postText: inputText
            }, {
                withCredentials: true
            })
                .then((res) => {
                    console.log("res: ", res.data);
                    setRefresh(!refresh)
                    // alert("post created");

                })
        }
    }

    return (
        <div style={{ margin: "1rem" }}>

            <h1> Dashboard Page </h1>


            <Stack spacing={2} direction="column">

                <TextField
                    id="outlined-multiline-static"
                    multiline
                    rows={4}
                    value={inputText}
                    onChange={(e) => {
                        setInputText(e.target.value)
                    }}
                    placeholder="What's in your mind"
                /> <br />
                <Button variant="contained" onClick={submit}>Post</Button>

            </Stack>

            <br />

            {posts.map((eachPost, index) => (
                <Post key={index} name={eachPost.name} email={eachPost.email} text={eachPost.postText} />
            ))}

            <br />

            {(isMore) ? <Button onClick={loadMore}>Load More</Button> : null}

        </div>
    );
}

export default Dashboard;