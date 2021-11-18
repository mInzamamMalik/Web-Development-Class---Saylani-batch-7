import axios from 'axios';
import { useState, useEffect } from "react"
import { baseUrl } from "./../../core"

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import io from 'socket.io-client';

function Scoreboard() {
    const [score, setScore] = useState({
        teamOne: "",
        teamTwo: "",
        bat: "",
        score: "",
        wicket: "",
        over: ""
    });

    useEffect(() => {
        axios.get(`${baseUrl}/api/v1/score`)
            .then((res) => {
                console.log("res +++: ", res.data);
                setScore(res.data)
            })
    }, [])

    const submit = () => {
        axios.post(`${baseUrl}/api/v1/score`, score)
            .then((res) => {
                console.log("res: ", res.data);
            })
    }

    return (
        <div style={{ margin: "1rem" }}>

            <h1> Dashboard Control page </h1>

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >

                <TextField
                    label="Team 1"
                    variant="standard"
                    value={score.teamOne}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, teamOne: e.target.value }
                        })
                    }}
                    placeholder="enter team one name"
                />

                <TextField
                    label="Team 2"
                    variant="standard"
                    value={score.teamTwo}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, teamTwo: e.target.value }
                        })
                    }}
                    placeholder="enter team two name"
                /> <br />
                <TextField
                    label="Bating team"
                    variant="standard"
                    value={score.bat}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, bat: e.target.value }
                        })
                    }}
                    placeholder="who is batting"
                /> <br />
                <TextField
                    label="runs/score"
                    variant="standard"
                    type="number"
                    value={score.score}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, score: e.target.value }
                        })
                    }}
                    placeholder="What's the score"
                /> <br />
                <TextField
                    label="wicket"
                    variant="standard"
                    type="number"
                    value={score.wicket}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, wicket: e.target.value }
                        })
                    }}
                    placeholder="how many wickets"
                /> <br />
                <TextField
                    label="over"
                    variant="standard"
                    type="number"
                    value={score.over}
                    onChange={(e) => {
                        setScore((prev) => {
                            return { ...prev, over: e.target.value }
                        })
                    }}
                    placeholder="how many overs"
                /> <br />
                <Button variant="contained" onClick={submit}>Post</Button>

            </Box>

        </div>
    );
}

export default Scoreboard;