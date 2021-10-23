import React, { useEffect, useRef } from 'react'
import { View, Text } from 'react-native'
import MapView,{Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import { useSelector } from 'react-redux';
import tw from 'tailwind-react-native-classnames';
import { selectDestination, selectOrigin, setTravelTimeInformation } from '../slices/navSlice';
import {GOOGLE_MAPS_APIKEY} from '@env';
import { useDispatch } from 'react-redux';
const Map = () => {
  const origin=useSelector(selectOrigin);
  const destination=useSelector(selectDestination);
  const mapRef=useRef(null)
  const dispatch=useDispatch();

  useEffect(()=>{
    if(!origin || !destination ) return;

    mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
      edgePadding:{top:50,bottom:50,left:50,right:50}
    });
  },[origin,destination]);

  useEffect(()=>{
    if(!origin || !destination) return;
   const getTravelTimeInfo=async()=>{
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial
        &destinations=${destination.description}
        &origins=${origin.description}
        &key=${GOOGLE_MAPS_APIKEY}`).then((res)=>res.json()).then((data)=>{
          dispatch(setTravelTimeInformation(data.rows[0].elements[0])) ;
        });
    };
    getTravelTimeInfo();
  },[origin,destination,GOOGLE_MAPS_APIKEY]);

    return (
        
             <MapView
             ref={mapRef}
             style={tw`flex-1`} 
             mapType="mutedStandard"
    initialRegion={{
      latitude: origin.location.lat,
      longitude: origin.location.lng,
      latitudeDelta: 0.0055,
      longitudeDelta:  0.0055,
    }}
  >
    {origin && destination && (
      <MapViewDirections
      origin={origin.description}
      destination={destination.description}
      apikey={GOOGLE_MAPS_APIKEY}
      strokeWidth={3}
      strokeColor="black"
      />
    )}
   
    {origin?.location && (
      <Marker
      coordinate={{
        latitude:origin.location.lat,
        longitude:origin.location.lng
      }}
      title="Origin"
      description={origin.description}
      identifier="origin"
      />

      
    )}
    {destination?.location && (
      <Marker
      coordinate={{
        latitude:destination.location.lat,
        longitude:destination.location.lng
      }}
      title="Destination"
      description={destination.description}
      identifier="destination"
      />

      
    )}

    </MapView>
        
    )
}

export default Map
