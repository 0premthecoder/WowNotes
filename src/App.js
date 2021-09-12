import { useState } from 'react';
import './App.css';
import Navbar from './Components/Navbar';
import { Home } from './Components/Home';
import About from './Components/About';
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import NoteState from './Context/notes/NoteState';
import Signup from './Components/Signup';
import Login from './Components/Login';
// import Alert from './Components/Alert';




function App() {
  let defaultMode = localStorage.getItem("theme")
  if(defaultMode === null){
    defaultMode = 'light'
  }
  else {
    defaultMode = localStorage.getItem("theme")
  }
  const [mode, setMode] = useState(defaultMode)
  // const [alert, setAlert] = useState(null)

  const toogletheme = () => {
    if (mode === "dark") {
      setMode('light')
      document.body.style.backgroundColor = 'white'
      localStorage.setItem("theme", "light")
    }
    else {
      setMode('dark')
      localStorage.setItem("theme", "dark")
    }
  }
  if (defaultMode === "dark") {
    document.body.style.backgroundColor = 'black'
  }
  else{
    document.body.style.backgroundColor = 'white'
  }
  return (
    <>
      <NoteState>
        <Router>
          <Navbar toogletheme={toogletheme} mode={mode}/>
          {/* <Alert alert="Amazing" /> */}
          <div className="container" >
            <Switch>
              <Route exact path="/about">
                <About mode={mode} />
              </Route>
              <Route exact path="/">
                <Home mode={mode}/>
              </Route>
              <Route exact path="/singup">
                <Signup mode={mode} />
              </Route>
              <Route exact path="/login">
                <Login mode={mode} />
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
