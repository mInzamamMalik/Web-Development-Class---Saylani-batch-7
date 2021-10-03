import './App.css';
import {
  Switch,
  Route,
  useHistory
} from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import Todo from "./components/Todo/todo";
import RealtimeTodo from "./components/realTimeTodo/realtimeTodo";

function App() {
  let history = useHistory();

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography onClick={() => { history.push("/") }} variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Firestore Example
            </Typography>
            <Button color="inherit" variant="text" onClick={() => { history.push("/") }}>Todo</Button>
            <Button color="inherit" variant="text" onClick={() => { history.push("/realtime") }}>Real-Time Todo</Button>

          </Toolbar>
        </AppBar>

        <Switch>
          <Route exact path="/">
            <Todo />
          </Route>

          <Route path="/realtime">
            <RealtimeTodo />
          </Route>
        </Switch>
      </Box>
    </>
  )
}
export default App;
