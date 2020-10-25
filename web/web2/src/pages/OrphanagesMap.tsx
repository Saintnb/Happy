import React, {useEffect, useState} from 'react';
import mapMarker from '../images/map-marker.svg';
import {Link} from 'react-router-dom';
import {FiPlus, FiArrowRight} from 'react-icons/fi';
import '../styles/pages/OrphanagesMap.css';

import{Map, TileLayer, Marker, Popup} from 'react-leaflet';
import mapIcon from '../utils/mapicon';
import api from '../services/api';

interface Orphange{
    id:number,
    latitude: number,
    longitude: number,
    name: string
}
function OrphanagesMap(){
    const [orphanages, setOrphanages]=useState<Orphange[]>([]);
    useEffect(()=>{
        api.get('orphanages').then(response=>{
             setOrphanages(response.data);
        });
    },[]);
    
    return(
        <div id="page-map">
           <aside>
            <header>
                    <img src={mapMarker} alt="Happy"/>
                    <h2>Escoha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
            </header>

                <footer>
                    <strong>Buenos Aires</strong>
                    <span>Wilde</span>
                </footer>
           </aside>
           <Map
           center={[-34.6947713,-58.3111405]}
           zoom= {15}
           style={{width:'100%', height:'100%'}}
           >
            <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
             
             {/* {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} */}

            {orphanages.map(orphanage=>{
                return(
                    <Marker
                    key={orphanage.id}
                    icon={mapIcon}
                    position={[orphanage.latitude,orphanage.longitude]}
                    >
                        <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                            {orphanage.name}
                            <Link to={`orphanages/${orphanage.id}`}>
                                <FiArrowRight size={20}color="#333"/>
                            </Link>
                        </Popup>
                    </Marker>
                );
            })}
           </Map>

           <Link to="/orphanages/create" className="create-orphanage">
               <FiPlus size={32} color="#fff"/>
           </Link>
        </div>
    );
}

export default OrphanagesMap;