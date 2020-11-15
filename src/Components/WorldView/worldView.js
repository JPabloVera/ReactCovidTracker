import React from 'react';
import SideEstatistics from './SideEstatistics/sideEstatistics';
import SideMap from './SideMap/sideMaps';
import './worldView.css'

const WorldView = () => {
    
    return (
        <div className="worldView">
            <div className="map">
                <SideMap/>
            </div>
            <div className="estatisc">
                <SideEstatistics/>
            </div>
        </div>
    );
}
 
export default WorldView;