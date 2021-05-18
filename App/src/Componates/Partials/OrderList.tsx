import React, {useEffect, useState} from "react";

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
    const [orderArray, setOrderArray] = useState([]);
    useEffect(() => {
        for(const item in items) {
            console.log(items[item])
            const newObject = {
                count: 1,
                name: items[item].name,
                menu: items[item].menu,
                price: items[item].price
            };
            if(orderArray.length !== 0) {
                setOrderArray([newObject]);
            } else {
                // for(const secondItem in orderArray) {
                //     if(orderArray[secondItem].name == newObject.name) {
                //         const newArray = [...orderArray];
                //         newArray[secondItem].count = newArray[secondItem].count + 1;
                //         setOrderArray(newArray);
                //     }
                // }
                const found = orderArray.some(obj => obj.name === newObject.name)
                if(!found) {
                    setOrderArray(oldArray => [...oldArray, newObject])
                    console.log(orderArray)
                } else {
                    setOrderArray(oldArray => oldArray)
                    console.log(orderArray)
                }


            }
        }
    }, [items]);
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
                        <p>No Data</p>
                }
            </div>
            <div style={{height: '5%'}}>
                <p style={{float: 'right', marginRight:'10px'}}>Total: ${total.toFixed(2)}</p>
            </div>
        </>
    );
};
