import React, { useState,useEffect } from 'react';
import './Nav.css'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
  import { useDispatch } from 'react-redux';

const Nav = () => {
    const dispath=useDispatch()
    const onMapClick = () => {
        dispath({type:'track/setCountry',payload:'world'})
        dispath({type:'track/setSearchingState',payload:false}) 
    }
    return (
            <div className="navContainer">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/map" onClick={onMapClick}>Map</Link>
                        </li>
                    </ul>
            </div>
    );
}
 
export default Nav;