import React, {useState, useEffect} from 'react';
import './randomChar.css';
import GotService from '../../services/gotService'
import Loader from '../loader'
import ErrorMessage  from '../errorMessage'
export default function RandomChar({interval}) {


    let gotService = new GotService()
    const [char, updateCharacter] = useState({})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)

    useEffect(() => {
        updateChar()
        let timerId = setInterval(updateChar, interval)
        return () => {
        clearInterval(timerId)

        }
    },[])

    function onCharLoaded (char) {
        setLoading(false)
        updateCharacter(char)
    }
    function onError (char) {
        setLoading(false)
        updateCharacter(char)
        setError(true)

    }
    function updateChar () {
        console.log('created')
        const id = Math.floor(Math.random() * 140 + 25) //25-140 character
        gotService.getCharacter(id)
            .then(onCharLoaded)
            .catch(onError)
    }

        const content = !(loading || error) ? <View char={char}/> : null
        const loader = loading ? <Loader/> : null
        const errorMes = error ? <ErrorMessage/> : null


        return (
            <div className="random-block rounded">
                {loader}
                {content}
                {errorMes}
            </div>
        );


}
const View = ({ char }) => {
    const {name, gender, born, died, culture } = char
         return (
             <>
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture}</span>
                    </li>
                 </ul>
            </>
        )
}
