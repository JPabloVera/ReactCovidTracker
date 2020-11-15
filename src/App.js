import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import world from './assets/world.png'
import Search from './Components/Search/Search'
import WorldView from './Components/WorldView/worldView'
import {
  BrowserRouter,
  Switch,
  Route,
  withRouter,
  Link
} from "react-router-dom";
import {useSelector} from 'react-redux';
import {useGlobalDispatcher} from './redux/hooks'
function App() {
  const appStyle={
    width:"100%",
    height:"100%",
    position:"absolute",
    backgroundImage:"url("+world+")"
  }
  const estilo = {
    backgroundColor:"#a2acbd"
  }

  
  return (
    <BrowserRouter>
      <div className="App" id="appStyle">
        <div className="nav">
          <Nav/>
        </div>
        <Switch>
            <Route exact path="/" render={() => (
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
