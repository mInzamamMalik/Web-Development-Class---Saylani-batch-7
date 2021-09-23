

import { GlobalContext } from './context/Context';
import { useContext } from "react";




function App() {

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
        userName: "Saylani",
        email: "saylani@sysborg.com",
        subject: "Computer Science"
      }
    })

  }

  function changeTheme() {
    dispatch({
      type: "CHANGE_THEME"
    })
  }



  return (
    <>
      <h1>hello {state?.user?.email}</h1>

      <br />

      <button onClick={logout}>Logout</button>


      <button onClick={login}>Login</button>


      <button onClick={changeTheme}>Change Theme</button>

      <h1>{(state.darkTheme) ? "Dark theme" : "Light Theme"}</h1>


    </>
  );
}

export default App;
