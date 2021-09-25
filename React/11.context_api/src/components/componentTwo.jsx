
import { GlobalContext } from '../context/Context';
import { useContext } from "react";

function ComponentTwo() {
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
                userName: "John",
                email: "John@sysborg.com",
                subject: "Finance"
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
            <h1>I am component Two</h1>
            <p>
                username: {state?.user?.userName} <br />
                email: {state?.user?.email} <br />
                subject: {state?.user?.subject} <br />
            </p>
            <br />

            <button onClick={logout}>Logout</button>
            <button onClick={login}>Login John</button>

            <br />

            <h1>{(state.darkTheme) ? "Dark theme activated" : "Light Theme activated"}</h1>
            <button onClick={toggleTheme}>Toggle Theme</button>
        </>
    );
}
export default ComponentTwo;
