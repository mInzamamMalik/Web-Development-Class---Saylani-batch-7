import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import { SearchAppBar } from "./components/surfaces/appBar"
import Home from "./components/home/home"
import Contact from "./components/contact/contact"
import About from "./components/about/about"

import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@mui/material"
import MenuIcon from '@mui/icons-material/Menu';


function App() {
  return (
    <Router>

      App component

      {/* <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            
            
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            
            
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>
            <Button color="inherit">Login</Button>

            
          </Toolbar>
        </AppBar>
      </Box>
 */}

      <SearchAppBar />

      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>


      <Switch>
        <Route path="/about">
          <About />
        </Route>

        <Route path="/contact">
          <Contact />
        </Route>

        <Route path="/">
          <Home />
          <HelloComp />
        </Route>

      </Switch>


    </Router>
  );
}

export default App;


export function HelloComp() {
  return <h1> I am Hello component </h1>
}
