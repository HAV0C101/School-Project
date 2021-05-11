import React from "react";

type itemType = {
    menu: string | null
    name: string,
    price: number
}
export const OrderList = ({setOrder, items}:{setOrder:any, items: itemType[]}):JSX.Element => {
    let total = 0;
    for (const itemsKey in items) {
        total = total + items[itemsKey].price;
    }
    return (
        <>
            <div style={{}} className={'order-list'}>
                {
                    items != undefined ?
                        items.map((item, index) => {
                            if(item == undefined) return;
                            return (
                                <div className={'order-item'} onClick={() => setOrder((order: any[]) =>{
                                    const testArray = [...order];
                                    testArray.splice(index, 1);
                                    return testArray;
                                })} key={index}>
                                    <p style={{float: 'left', marginLeft: '10px'}}>{item.name}</p>
                                    <p style={{float: 'left', marginLeft: '10px'}}>{item.menu}</p>
                                    <p style={{float: 'right', marginRight: '10px'}}>${item.price.toFixed(2)}</p>
                                    <hr style={{clear: 'both', border: '1px solid transparent'}}/>
                                </div>
                            );
                        })
                        :
                        <p>lol</p>
                }
            </div>
            <div style={{height: '5%'}}>
                <p style={{float: 'right', marginRight:'10px'}}>Total: ${total.toFixed(2)}</p>
            </div>
        </>
    );
};
