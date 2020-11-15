import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import Search from './Components/Search/Search'
import WorldView from './Components/WorldView/worldView'
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter
} from "react-router-dom";

function App() {


  
  return (
    <BrowserRouter>
      <div className="App" id="appStyle">
        <div className="nav">
          <Nav/>
        </div>
        <Switch>
            <Route exact path="/ReactCovidTracker/" render={() => (
              <Search containerStyle={"searchContainer"} visibleContainer={true} searchInputContainerStyle={"searchInputContainerStyle"} searchInputStyle={"searchInputStyle"} 
              inputPlaceholder={"Countries,Provinces,Cities.."} validationClass={"validationError"}/>
            )}/>
            <Route path="/map" component={withRouter(WorldView)}/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
