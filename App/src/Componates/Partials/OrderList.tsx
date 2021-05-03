import React from "react";

type itemType = {
    name: string,
    price: number
}
export const OrderList = ({items}:{items: itemType[]}):JSX.Element => {
    let total = 0
    for (const itemsKey in items) {
        total = total + items[itemsKey].price
    }
    return (
        <>
            {
                items.map((item, index) => {
                    return (
                        <div key={index}>
                            <p>{item.name}</p>
                            <p>${item.price.toFixed(2)}</p>
                        </div>
                    )
                })
            }
            <p>${total.toFixed(2)}</p>
        </>
    )
}
