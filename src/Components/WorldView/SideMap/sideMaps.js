import React,{useState,useEffect} from 'react';
import './sideMap.css'
import {useCountryState,checkCountryName} from '../../../redux/hooks'
import ReactMapboxGl,{MapContext } from "react-mapbox-gl";
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import {calculateCovidSituation} from '../../../services/covidService'

const Map = ReactMapboxGl({
        minZoom:1,
        maxZoom:8,
        accessToken:process.env.REACT_APP_MAPBOX_ACCESSTOKEN
})



const SideMap = () => {
        const dispatch=useDispatch()

        const globalCountryState=useCountryState()
        const searchingState = useSelector(state => state.search.searching)

        const [countries,setCountries] = useState(['world'])
        const[country,setCountry]=useState({
                country:'world',
                bounds:null,
                color:"#c7fceb"
        })

        const clickHandler = (map,evt) =>{
                axios.get("https://api.mapbox.com/geocoding/v5/mapbox.places/"+evt.lngLat.lng+","+evt.lngLat.lat+".json?access_token="+process.env.REACT_APP_MAPBOX_ACCESSTOKEN)
                .then( resp => {
                        
                        if( resp.data.features[resp.data.features.length -1] !== undefined){
                                setCountries(checkCountryName(resp.data.features[resp.data.features.length -1].place_name))
                                dispatch({type:'track/setCountry',payload:resp.data.features[resp.data.features.length -1].place_name})
                                setCountry({ 
                                        country:resp.data.features[resp.data.features.length -1].place_name,
                                        bounds: resp.data.features[resp.data.features.length -1].bbox
                                })
                        }
                        
                })
        }

        useEffect(()=>{
                if(globalCountryState !== undefined){

                        if(searchingState === true){
                                        
                                setCountry({ 
                                        country: globalCountryState.Country,
                                        bounds: globalCountryState.geolocation.bbox
                                })
                                setCountries(checkCountryName(globalCountryState.Country))
                                dispatch({type:'track/setSearchingState',payload:false})   
                                
                        }
                }
        },[globalCountryState])

        return ( 
                        <div className="newViewport">
                                <Map style="mapbox://styles/pablvvera/ckg6xppv92qti19pnr73y72ie"
                                className="mapContainer"
                                onClick={clickHandler}
                                fitBounds={country.bounds}
                                >
                                        <MapContext.Consumer>
                                                {(map)=>{
                                                        map.addLayer({
                                                                'id': 'mapId',
                                                                'source': {
                                                                        'type': 'vector',
                                                                        'url': 'mapbox://pablvvera.cpi9qsyn'
                                                                },
                                                                
                                                                'source-layer': 'ne_10m_admin_0_countries-3t2h8u',
                                                                'type': 'fill'
                                                        })
                                                        map.setPaintProperty('mapId',"fill-color",globalCountryState !== undefined? (globalCountryState.Country !== "world"? calculateCovidSituation(globalCountryState.Active):"#c7fceb"):"#c7fceb")
                                                        
                                                        map.setFilter(
                                                                'mapId',
                                                                ['in', 'NAME_EN'].concat(countries[0]),
                                                                );
                                                        map.on('error',()=>{

                                                        }) 

                                                }}
                                        </MapContext.Consumer>
                                </Map>
                </div>
        );
}
 
export default SideMap;