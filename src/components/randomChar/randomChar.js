import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService'
import Loader from '../loader'
import ErrorMessage  from '../errorMessage'
export default class RandomChar extends Component {

    constructor() {
        super()
        this.updateChar()
    }
   gotService = new gotService()
    state = {
        char: {},
        loading: true,
        error: false

    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    onError = (char) => {
        this.setState({
            char,
            loading: false,
            error: true
        })
    }
    updateChar() {
        const id = Math.floor(Math.random() * 140 + 25) //25-140 character
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
            .catch(this.onError)
    }
    render() {
        const{ char , loading , error}= this.state
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


}
const View = ({ char }) => {
    const mess = 'no info'
    const {name, gender, born, died, culture } = char
         return (
             <>
                <h4>Random Character: {name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Gender </span>
                        <span>{gender || mess}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Born </span>
                        <span>{born || mess}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Died </span>
                        <span>{died || mess}</span>
                    </li>
                    <li className="list-group-item d-flex justify-content-between">
                        <span className="term">Culture </span>
                        <span>{culture || mess}</span>
                    </li>
                 </ul>
            </>
        )
    }
