import React from "react";

type itemType = {
    name: string,
    price: number
}
export const OrderList = ({setOrder, items}:{setOrder:any, items: itemType[]}):JSX.Element => {
    let total = 0
    for (const itemsKey in items) {
        total = total + items[itemsKey].price
    }
    return (
        <>
            <div style={{overflowY: 'auto', height: '90%', marginTop: '20px'}}>
                {
                    items != undefined ?
                        items.map((item, index) => {
                            if(item == undefined) return
                            return (
                                <div className={'order-item'} onClick={() => setOrder((order: any[]) =>{
                                    const newArray = order.splice(index, 1)
                                    console.log(newArray)
                                    return newArray
                                })} key={index}>
                                    <p style={{float: 'left', marginLeft: '10px'}}>{item.name}</p>
                                    <p style={{float: 'right', marginRight: '10px'}}>${item.price.toFixed(2)}</p>
                                    <hr style={{clear: 'both'}}/>
                                </div>
                            )
                        })
                        :
                        <p>lol</p>
                }
            </div>
            <div style={{height: '5%'}}>
                <p style={{float: 'right', marginRight:'10px'}}>Total: ${total.toFixed(2)}</p>
            </div>
        </>
    )
}
