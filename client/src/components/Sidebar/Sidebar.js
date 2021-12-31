import React, {useContext} from 'react';
import {MarkerContext, AddMarkerContext} from '../Dashboard/Dashboard'
// import { ReactComponent as Logo } from '../../assets/worldwide.svg';
import {BsArrowRight} from 'react-icons/bs'
import AddMarkerForm from './AddMarkerForm'
import CurrentMarker from './CurrentMarker/CurrentMarker'

function Sidebar({refreshMarkers, setRefreshMarkers}) {

  //clicked marker by client
  const {currentMarker, setCurrentMarker} = useContext(MarkerContext)

  //coords of new marker
  const {addLat, addLng, setAddLat, setAddLng} = useContext(AddMarkerContext)

  if(JSON.stringify(currentMarker) === '{}' && !addLat){
    return (
      <section className="hidden shadow-inner md:flex md:w-1/4 md:h-full p-2 py-4 text-lg flex-col gap-12 justify-center items-center text-center bg-gray-800 text-white">
        <h1>Add you favorite places to the <span className = "text-fb-blue-light">Map</span> with just a click!</h1>
        <BsArrowRight className = "hidden md:block animate-bounce text-fb-blue-light"/>
        {/* <Logo className = "hidden md:block w-1/4 md:w-1/2"/> */}
        <h2>To see your <span className = "text-fb-blue-light">Friends'</span> places, click on the marker</h2>
      </section>
    )
  } else{ 
    return (
      <>
       {
         JSON.stringify(currentMarker) === '{}' ? null :
         <CurrentMarker currentMarker = {currentMarker} setCurrentMarker = {setCurrentMarker} refreshMarkers = {refreshMarkers} setRefreshMarkers = {setRefreshMarkers} />    
       }
       {
         addLat && <AddMarkerForm addLat = {addLat} addLng = {addLng} setAddLat = {setAddLat} setAddLng = {setAddLng} refreshMarkers = {refreshMarkers} setRefreshMarkers = {setRefreshMarkers} setCurrentMarker = {setCurrentMarker}/>
       }
      </>
    );
  }
}

export default Sidebar;
