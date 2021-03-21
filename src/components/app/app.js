import React, { Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import {CharacterPage, BookPage, HousePage, BooksItem} from '../pages'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './app.css'


export default class App extends Component {
    constructor() {
        super()

    }

    gotService = new GotService()
    state = {
        showButton: true,
        error: false
    }

    componentDidCatch() {
        console.log('error')
        this.setState({
            error:true
        })
    }

    buttonEvent = () => {
        this.setState({
          showButton : !this.state.showButton
      })
    }


    render() {
        const { showButton } = this.state
        const randomHero = showButton ? <RandomChar /> : null

        if (this.state.error) {
            return <ErrorMessage/>
        }
            return (
                <Router>
                    <div className="app">
                        <Container>
                            <Header />
                        </Container>
                        <Container>
                            <Row>
                                <Col lg={{size: 5, offset: 0}}>
                                    {randomHero}
                                </Col>
                            </Row>
                            <button onClick={this.buttonEvent}>HIDE</button>
                            <Route path="/" exact component={ ()=> <div className="welcome">Welcome to GoT DB </div>}/>
                            <Route path="/characters" component={ CharacterPage}/>
                            <Route path="/houses" component={ HousePage}/>
                            <Route path="/books" exact component={ BookPage}/>
                            <Route path="/books/:id" render={({ match }) => {
                                const {id} = match.params
                                return <BooksItem bookId={ id }/>
                            }} />
                        </Container>
                    </div>
                </Router>
    );
}
};
