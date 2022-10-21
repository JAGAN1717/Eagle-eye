// const map_api = 'AIzaSyCoQVCOOlnK5MrHl608Wjg3XNiwUbN_4BI'
import React,{useState,useEffect,useCallback} from "react"
import {useJsApiLoader, GoogleMap, Marker, Autocomplete, DirectionsRenderer}  from '@react-google-maps/api' 

const containerStyle = {
    width: "1365px",
    height: '600px'
  };
  
  const center = {
    lat: 13.163130, 
    lng: 80.228401
  };

  const onLoad = marker => {
    console.log('marker: ', marker)
  }

const Map = () =>{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey:'AIzaSyCoQVCOOlnK5MrHl608Wjg3XNiwUbN_4BI'
        })

        const [map, setMap] = useState(null)

        const onLoad = useCallback(function callback(map) {
          const bounds = new window.google.maps.LatLngBounds(center);
          map.fitBounds(bounds);
          setMap(map)
        }, [])
      
        const onUnmount = useCallback(function callback(map) {
          setMap(null)
        }, [])
      
        return isLoaded ? (
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={60}
              onLoad={onLoad}
              onUnmount={onUnmount}
            >

              <></>
            </GoogleMap>
        ) : <></>

}


// import React from "react";
// import GoogleMapReact from 'google-map-react';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;

// const Map = () =>{
//   const defaultProps = {
//     center: {
//       lat: 13.163130,
//       lng: 13.163130
//     },
//     zoom: 11
//   };

//   return (
//     // Important! Always set the container height explicitly
//     <div style={{ height: '600px', width: '1365px' }}>
//       <GoogleMapReact
//         bootstrapURLKeys={{ key: "AIzaSyCoQVCOOlnK5MrHl608Wjg3XNiwUbN_4BI" }}
//         defaultCenter={defaultProps.center}
//         defaultZoom={defaultProps.zoom}
//       >
//         <AnyReactComponent
//           lat={59.955413}
//           lng={30.337844}
//           text="My Marker"
//         />
//       </GoogleMapReact>
//     </div>
//   );
// }

export default Map
