import React, {useState, useEffect} from 'react';
import './itemDetails.css';


export const Field = ({item, field, label}) => {
    return (
        <li className="list-group-item d-flex justify-content-between">
            <span className="term">{ label }</span>
            <span>{item[field]  || 'no data'}</span>
        </li>
    )
}
export default function ItemDetails({itemId, getData, children}) {


    const [item, updateItem] = useState({})

    useEffect(() => {
        if (!itemId) {
            return;
        }

        getData(itemId)
            .then((data) => {
                updateItem(data)
            })
    }, itemId)

        if (!itemId) {
            return <span className="select-error">Please select item</span>
        }

        const {name} = item

        return (
            <div className="char-details rounded">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {
                        React.Children.map(children, (child) => {
                            return React.cloneElement(child, {item})
                        })
                    }
                </ul>
            </div>
        );
}
