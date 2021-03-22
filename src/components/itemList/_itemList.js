import React, { Component } from 'react';

import Loader from '../loader'

import './itemList.css';
export default class ItemList extends Component {



    state = {
        itemList: null
    }

    componentDidMount() {

        const {getData} = this.props

        getData()
            .then(itemList => {
                this.setState({itemList})
            })
    }

    renderItems(itemsArray) {
        return itemsArray.map((item) => {
            console.log('item', item)
            const { id } = item;
            const label = this.props.renderItem(item)
            return (
                <li className="list-group-item" key={id} onClick={()=>this.props.onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }

    render() {

        const { itemList } = this.state

        if (!itemList) {
            return <Loader/>
        }

        const items = this.renderItems(itemList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );
    }
}
