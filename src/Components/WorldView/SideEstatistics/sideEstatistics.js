import React from 'react';
import './sideEstatistics.css'
import { useSelector} from 'react-redux';
import {useCountryState,useGlobalDispatcher} from '../../../redux/hooks'
import Search from '../../Search/Search'

const SideEstatistics = () => {
    useGlobalDispatcher(useSelector(state => state.search.countrySearch))
    const state = useCountryState()
   
    return(
        <div className="sideEstatistics">
            <ul>
                <li>
                    <span>Location:</span>
                    <spam className="searchSpam">
                        <Search containerStyle={"searchContainer1"} searchInputContainerStyle={"searchInputContainerStyle1"} searchInputStyle={"searchInputStyle1"} inputPlaceholder={state? state.Country: null} 
                        displayButtom={{display:"none"}} homeContainerStyle={{ top:"5%",marginLeft:"2%"}} validationClass={"validation"}/>
                    </spam>
                </li>
                <li>
                    <span>Total Cases:</span>
                    <span>
                        {state? state.Confirmed : null}
                    </span>
                </li>
                <li>
                    <span>Deaths:</span>
                    <span>
                        {state? state.Deaths : null}
                    </span>
                </li>
                <li>
                    <span>Active cases:</span>
                    <span>
                        {state? state.Active: null}
                    </span>
                </li>
                <li>
                    <span>Recovered:</span>
                    <span>
                        {state? state.Recovered : null}
                    </span>
                </li>
            </ul>
    </div>
    )       
}

export default SideEstatistics;

