import logo from './logo.svg';
import './App.css';
import { baseUrl } from "./core"
import axios from 'axios';
import { useState, useEffect, useRef } from "react"

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';



import Login from "./components/login/index"
import Signup from "./components/signup/index"
import Dashboard from "./components/dashboard/index"

import { GlobalContext } from './context/Context';
import { useContext } from "react";

function App() {

  let history = useHistory();
  let { state, dispatch } = useContext(GlobalContext);

  useEffect(() => {

    axios.get(`${baseUrl}/api/v1/profile`, {
      withCredentials: true
    })
      .then((res) => {
        console.log("res: ", res.data);

        if (res.data.email) {

          dispatch({
            type: "USER_LOGIN",
            payload: {
              name: res.data.name,
              email: res.data.email,
              _id: res.data._id
            }
          })
        }
      })

    return () => {
    };
  }, []);


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React Login project</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => { history.push("/") }}>Dashboard</Nav.Link>
              <Nav.Link onClick={() => { history.push("/login") }}>Login</Nav.Link>
              <Nav.Link onClick={() => { history.push("/signup") }}>Signup</Nav.Link>

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>




      {(state.user.email) ?

        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>

          <Redirect to="/" />
        </Switch>
        :
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/signup" component={Signup} />

          <Redirect to="/" />
        </Switch>
      }
    </>
  );
}

export default App;
