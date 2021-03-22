import React, { useState,useEffect } from 'react';

import Loader from '../loader'

import './itemList.css';
export default function ItemList ({onItemSelected,renderItem,getData}) {

    const [itemList, updateList] = useState([])

    useEffect(() => {
         getData()
            .then(data => {
                updateList(data)
            })
    }, [])


    function renderItems(itemsArray) {
        return itemsArray.map((item) => {
            console.log('item', item)
            const { id } = item;
            const label = renderItem(item)
            return (
                <li className="list-group-item" key={id} onClick={()=>onItemSelected(id)}>
                    {label}
                </li>
            )
        })
    }



        if (!itemList) {
            return <Loader/>
        }

        const items = renderItems(itemList)
        return (
            <ul className="item-list list-group">
                {items}
            </ul>
        );

}
