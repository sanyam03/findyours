import {useState} from 'react'

function useToken() {
    const getToken = () => {
        const token = JSON.parse(localStorage.getItem('token'))
        return token
    }

    const [token, setToken] = useState(getToken())

    const addToken = (token) => {
        localStorage.setItem('token', JSON.stringify(token))
        setToken(token)
    }

    const removeToken = () => {
        localStorage.removeItem('token')
        setToken(null)
    } 
    

    return {addToken, token, removeToken}
}

export default useToken