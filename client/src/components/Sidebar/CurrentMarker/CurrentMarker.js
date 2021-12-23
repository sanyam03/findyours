import React, {useContext} from 'react'
import { TokenContext} from '../../../App'
import CommentSection from './CommentSection'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MarkerControllers from './LikeMarkDel'
import DefaultCity from '../../../assets/defaultCity.jpg'
import DefaultAvatar from '../../../assets/default-avatar.jpg'
import {Link} from 'react-router-dom'

function CurrentMarker({currentMarker, refreshMarkers, setRefreshMarkers, setCurrentMarker}) {

    const {token} = useContext(TokenContext)

    const addDefaultSrc = (e) => {
        e.target.src = DefaultCity
    }

    const notifyDeleted = () => toast.success(`You removed ${currentMarker?.name} !`, {
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });

    const notifyError = () => toast.error('An error occured with the server', {
      closeOnClick: true,
      draggable: true,
      progress: undefined,
    });

    const setDefaultAvatar = (e) => {
      e.target.src = DefaultAvatar
    }

    return (
        <>
        <ToastContainer  position = "top-center" autoClose = {3000} hideProgressBar newestOnTop={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover/>
        <section className={'hidden shadow-inner md:w-1/4 md:h-full md:flex flex-col bg-white text-gray-800 max-h-90 overflow-scroll overflow-x-hidden'}>

          <img src = {`${currentMarker.imgUrl}`} onError = {addDefaultSrc} alt = "place" className ="shadow-lg mb-3 w-full object-cover rounded-sm"/>
            
            <div className = "p-2">

                <MarkerControllers 
                    token = {token} 
                    notifyDeleted = {notifyDeleted} 
                    notifyError = {notifyError} 
                    currentMarker = {currentMarker} 
                    refreshMarkers = {refreshMarkers}
                    setRefreshMarkers = {setRefreshMarkers}
                    setCurrentMarker = {setCurrentMarker}
                  /> 


                <div className = "text-xs flex gap-2 justify-end text-gray-600">
                  <Link to = {`/profile/${currentMarker.user._id}`} className = "flex items-center gap-1">
                    <h2>{currentMarker.user.username}</h2>
                    <img src={`${currentMarker.user.imgUrl}`} onError = {setDefaultAvatar} alt = "profile-pic" className = "w-6 rounded-full shadow-md"/>
                    <p>|</p>
                  </Link>
                  <span className = "flex items-center">{currentMarker.post_date_formatted}</span>
                </div>
                <div className = "text-xs mt-2 pl-2 text-fb-blue font-bold">
                  <p>{currentMarker.description}</p>
                </div>

                {/*COMMENTS */}
                <CommentSection
                  token = {token} 
                  notifyError = {notifyError} 
                  currentMarker = {currentMarker} 
                />
 
            </div>
        </section>
        </>
    )
}


export default CurrentMarker
