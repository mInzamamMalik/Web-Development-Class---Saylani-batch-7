import logo from './logo.svg';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { useHistory } from "react-router-dom";


import Home from "./components/home/home"
import Weather from "./components/weather/weather"
import About from "./components/about/about"
import 'bootstrap/dist/css/bootstrap.min.css';


import { Button, Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';





function App() {


  let history = useHistory();

  return (
    <>
      {/* <nav>
        <ul>
          <Button onClick={() => {
            history.push("/");
          }}>
            Home
          </Button>
          <li>
            <Button onClick={() => {
              history.push("/weather");
            }}>
              Weather
            </Button>
          </li>
          <li>
            <Button onClick={() => {
              history.push("/about");
            }}>
              About
            </Button>
          </li>
          <li>
            <Button onClick={() => {
              history.goBack()
            }}>
              Go back
            </Button>
          </li>
        </ul>
      </nav> */}


      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{history.push("/")}}>Home</Nav.Link>
              <Nav.Link onClick={()=>{history.push("/weather")}}>Weather</Nav.Link>
              <Nav.Link onClick={()=>{history.push("/about")}}>About</Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/weather">
          <Weather />
        </Route>

        <Route exact path="/">
          <Home />
        </Route>

      </Switch>

    </>
  );
}

export default App;
