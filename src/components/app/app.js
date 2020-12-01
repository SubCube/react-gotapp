import React, { Component} from 'react';
import {Col, Row, Container} from 'reactstrap';
import Header from '../header';
import RandomChar from '../randomChar';
import ItemList from '../itemList';
import CharDetails from '../charDetails';


export default class App extends Component {
    constructor() {
        super()

    }
    state = {
        showButton: true
    }

    buttonEvent = () => {
        this.setState({
          showButton : !this.state.showButton
      })

    }

    render() {
        const { showButton } = this.state
        const randomHero = showButton ? <RandomChar/> : null
            return (
        <>
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
                <Row>
                    <Col md='6'>
                        <ItemList />
                    </Col>
                    <Col md='6'>
                        <CharDetails />
                    </Col>
                </Row>
            </Container>
        </>
    );
}
};
