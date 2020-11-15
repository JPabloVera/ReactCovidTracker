import React, { useState,useEffect } from 'react';
import './Search.css'
import SearchIcon from '@material-ui/icons/Search';
import { useSelector, useDispatch, useStore  } from 'react-redux';
import {Link} from 'react-router-dom'
import {countries} from '../../services/covidService'
import {checkCountryName} from '../../redux/hooks'

const Search = ({containerStyle,searchInputStyle,searchInputContainerStyle,displayButtom,inputPlaceholder,homeContainerStyle,validationClass, visibleContainer}) => {
    const dispath=useDispatch()

    const[searchField,setSearchField]=useState('')
    const[containerClasss,setContainerClass]=useState(visibleContainer? containerStyle : searchInputStyle)
    const[isActive,setIsActive]=useState(true)
    
    const validateCountryName = (countryName) => countries.includes(countryName)? true : false

    const onButtonClick = () => {
        if(validateCountryName(searchField)){
            visibleContainer? setContainerClass(containerStyle) : setContainerClass(searchInputStyle)
                
            dispath({type:'track/setCountry',payload: checkCountryName(searchField)})
            dispath({type:'track/setSearchingState',payload:true})

            setSearchField('')
        }else{
            setContainerClass(validationClass)
            setTimeout(()=>setContainerClass(visibleContainer? containerStyle : searchInputStyle),3000)
        }
    }


    useEffect(()=>{
        validateCountryName(searchField) === true? setIsActive(true) : setIsActive(false)
    },[searchField])

    return ( 
        <form className="Home" style={{...homeContainerStyle}}>
            <div className={visibleContainer? containerClasss : containerStyle} > 
                <Link to={isActive? "/map" : "#"} onClick={()=> onButtonClick()}>
                    <input type="submit" style={{display:'none'}}/>
                    <button onClick={() => onButtonClick()} style={displayButtom}>
                        <SearchIcon/>
                    </button>
                </Link>
                <div className={searchInputContainerStyle}>
                    <input type="text"
                    className={!visibleContainer? containerClasss : searchInputStyle}
                    value={searchField}
                    onChange={ result => setSearchField(result.target.value)}
                    placeholder={inputPlaceholder}
                    />
                </div>
            </div>
        </form>
    );
}

export default Search;