import React, { Component} from 'react';
import ItemList from '../itemList';
import {withRouter} from 'react-router-dom'
import ErrorMessage from '../errorMessage'
import GotService from '../../services/gotService'


 class BookPage extends Component {
    gotService = new GotService()
     state = {
         error: false
    }


    componentDidCatch() {
        console.log('error')
        this.setState({
            error:true
        })
    }
     render() {
        if (this.state.error) {
            return <ErrorMessage/>
        }



        return (
           <ItemList
                onItemSelected={(itemId) => {
                    this.props.history.push(itemId)
            }}
            getData={this.gotService.getAllBooks}
            renderItem={({name}) => name}/>
        )
    }
 }

 export default withRouter(BookPage)
