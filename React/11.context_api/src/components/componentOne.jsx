
import { GlobalContext } from '../context/Context';
import { useContext } from "react";

function ComponentOne() {
    let { state, dispatch } = useContext(GlobalContext); 

    function logout() {
        dispatch({
            type: "USER_LOGOUT",
            payload: null
        })
    }

    function login() {
        dispatch({
            type: "USER_LOGIN",
            payload: {
                username: "Malik",
                email: "malik@sysborg.com",
                subject: "Computer Science"
            }
        })
    }

    function toggleTheme() {
        dispatch({
            type: "TOGGLE_THEME"
        })
    }

    return (
        <>
            <h1>I am component One</h1>
            <p>
                username: {state?.user?.userName} <br />
                email: {state?.user?.email} <br />
                subject: {state?.user?.subject} <br />
            </p>
            <br />

            <button onClick={logout}>Logout</button>
            <button onClick={login}>Login Malik</button>

            <br />

            <h1>{(state.darkTheme) ? "Dark theme activated" : "Light Theme activated"}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </>
    );
}
export default ComponentOne;
