import {useState, useEffect} from 'react'

function useFetch(url) {

    const [data, setData] = useState(null)
    const [error, setError] = useState(null)

    //doesnt matter if true or false
    const [refresh, setRefresh] = useState(false)
    
    useEffect(() => {
        fetch(url)
            .then(res => {
                if(!res.ok) throw Error('could not fetch data')
                return res.json()
            })
            .then(data=> setData(data))
            .catch(err => setError(err))

    }, [url, refresh])

    return {data, setData, error, setError, refresh, setRefresh}
}

export default useFetch
