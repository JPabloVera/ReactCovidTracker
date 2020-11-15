import { useSelector, useDispatch} from 'react-redux';
import {countries} from '../services/covidService'
import axios from 'axios'
import {loadCountryAsync} from './trackingSlice'


export const useGlobalDispatcher = (country) => {
    const dispatch = useDispatch()
    
    const cache = useSelector(state => state.search.cache)
        if(!cache[String(country)]){
            dispatch(loadCountryAsync(country))
        }
}


export const fetchCountry = async (country) => { 
    if(country === "world"){
        const response = loadWorldDataAsync()
       return response
    }
    else if(countries.some(ctry => ctry.includes(country))){
        return loadCountry(country).then(resp => {
            return resp
        }).catch(err => console.log(err))
    }
}


export const loadWorldDataAsync = () => {
    return axios.get("https://api.covid19api.com/world/total", {responseType: 'json'}).then( response => {
        return {
            Country: 'world',
            Confirmed: response.data.TotalConfirmed,
            Deaths: response.data.TotalDeaths,
            Recovered: response.data.TotalRecovered,
            Active: response.data.TotalConfirmed - response.data.TotalDeaths - response.data.TotalRecovered
        }
     }).catch(err => console.log(err))
     
}


export const loadCountry = (country)=>{
    return new Promise((resolve)=>{
        if(country === "United States"){
            axios.get("http://covidtracking.com/api/us",{responseType: 'json'}).then(resp => {
                const response = {
                    Country: 'United States',
                    Recovered: resp.data[0].recovered,
                    Active: resp.data[0].hospitalized,
                    Confirmed: resp.data[0].positive,
                    Deaths: resp.data[0].death
                }
                resolve(response)
            }).catch(err => console.log(err))
        }else{

            axios.get("https://api.covid19api.com/country/"+country, {responseType: 'json'}).then( resp => {
                    resolve(resp.data[resp.data.length - 1])
                    
            }).catch(err => console.log(err))
        }
    }).then(response => {
        return  axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+country+".json?types=country&access_token="+process.env.REACT_APP_MAPBOX_ACCESSTOKEN,
        {responseType: 'json'}).then( res => {
            response.geolocation = {
                center: res.data.features[0].center,
                bbox:res.data.features[0].bbox
            }
            return response
        }).catch(err => console.log(err))
    })
}



export const checkCountryName = (country) => {
    return countries.filter( ctry => ctry.includes(country))
}
export const useCountryState = () => {
    const country=useSelector(state => state.search.countrySearch)
    const state = useSelector(state => state.search.cache[country])

    return state
}