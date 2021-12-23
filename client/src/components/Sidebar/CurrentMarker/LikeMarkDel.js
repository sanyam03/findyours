import React from 'react';
import {AiFillLike} from 'react-icons/ai'
import {RiBookmark3Fill} from 'react-icons/ri'
import {FaTrashAlt} from 'react-icons/fa'

function LikeMarkDel({user, token, notifyDeleted, notifyError, currentMarker, refreshMarkers, setRefreshMarkers, setCurrentMarker}) {

    const handleDelete = () => {
        fetch(`https://mappals.herokuapp.com/marker/${currentMarker._id}/delete`, {
            method:'DELETE',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
        })
        .then(res => res.json())
        .then(data => {
            if(data.err){
                notifyError() 
            } else{
                notifyDeleted()

                //refreshing markers in useFetch hook and "rerender sidebar"
                setRefreshMarkers(!refreshMarkers)
                setCurrentMarker({})
            }
        })
    } 

    const handleLike = () => {

        if(currentMarker.likes.includes(user._id)){
            currentMarker.likes.splice(currentMarker.likes.indexOf(user._id),1)
        } else{
            currentMarker.likes.push(user._id)
        }
        fetch(`https://mappals.herokuapp.com/marker/${currentMarker._id}/like`, {
            method: 'PATCH',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                likes: currentMarker.likes
            })
        })
        .then(res => res.json()) 
        .then(data => {
            if(data.err){
                notifyError() //
            }
        })
        //refresh again
        setRefreshMarkers(!refreshMarkers)
    }

    const handleBookmark = () => {

        if(user.bookmarks.includes(currentMarker._id)){
            user.bookmarks.splice(user.bookmarks.indexOf(currentMarker._id),1)
        } else{
            user.bookmarks.push(currentMarker._id)
        }
        fetch(`https://mappals.herokuapp.com/marker/${user._id}/bookmark`, {
            method: 'PATCH',
            headers: new Headers ({
                'Authorization': `token ${token}`,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                bookmarks: user.bookmarks
            })
        })
        .then(res => res.json()) 
        .then(data => {
            if(data.err){
                notifyError() //
            }
        })
        //refresh again
        setRefreshMarkers(!refreshMarkers)
    }

  return (
    <div className="flex w-full mb-3">
      <h1 className="text-2xl font-semibold text-fb-blue-light w-full">
        {currentMarker.name}
      </h1>
      <div className="flex items-center gap-4 justify-end ">
        <figure
          onClick={handleLike}
          className={`flex items-center text-lg cursor-pointer
            ${currentMarker.likes.includes(user._id) && 'text-fb-blue-light'}`}
        >
          <AiFillLike/>
          <figcaption>{currentMarker.likes.length}</figcaption>
        </figure>
        <RiBookmark3Fill onClick={handleBookmark} className={`text-lg cursor-pointer ${user.bookmarks.includes(currentMarker._id) && 'text-fb-blue-light'}`} />
        {user?._id === currentMarker.user?._id && (
          <FaTrashAlt
            onClick={handleDelete}
            className="text-md text-red-600 cursor-pointer"
          />
        )}
      </div>
    </div>
  );
}

export default LikeMarkDel;
