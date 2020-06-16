import React, {Component} from 'react';
import './randomChar.css';
import gotService from '../../services/gotService'
import Loader from '../loader'
export default class RandomChar extends Component {

    constructor() {
        super()
        this.updateChar()
    }
   gotService = new gotService()
    state = {
        char: {},
        loading: true
    }
    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
    }
    updateChar() {
        const id = Math.floor(Math.random()*140 + 25) //25-140 character
        this.gotService.getCharacter(id)
            .then(this.onCharLoaded)
    }
    render() {
        const{ char , loading }= this.state
        const content = loading ? <Loader/> : <View char={char}/>


        return (
            <div className="random-block rounded">
                {content}
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
