import React, {useEffect, useState} from "react";

type itemType = {
    menu: string | null
    name: string,
    price: number
}
export const OrderList = ({setOrder, items}:{setOrder: React.Dispatch<React.SetStateAction<itemType[]>>, items: itemType[]}):JSX.Element => {
    let total = 0;
    for (const itemsKey in items) {
        total = total + items[itemsKey].price;
    }
    const [orderArray, setOrderArray] = useState([]);
    useEffect(() => {
        items.forEach((item, index) => {
            const newObject = {
                count: 1,
                name: items[index].name,
                menu: items[index].menu,
                price: items[index].price,
                arrayIndex: index,
            };
            setOrderArray(Array => {
                if(Array.some(item => item.name === newObject.name && item.menu === newObject.menu)) {
                    const index = Array.findIndex(item => item.name === newObject.name);
                    Array[index].count = Array[index].count + 1;
                    return [...Array];
                } else {
                    return [...Array, newObject];
                }
            });
        });
    }, [items]);
    return (
        <>
            <div style={{}} className={'order-list'}>
                {
                    orderArray.map((item, index) => {
                        return <div className={'order-item'} onClick={() => setOrder((order: itemType[]) =>{
                            const testArray = [...order];
                            testArray.splice(item.arrayIndex, 1);
                            return testArray;
                        })} key={index}>
                            <p style={{float: 'left', marginLeft: '10px'}}>{item.count} x</p>
                            <p style={{float: 'left', marginLeft: '10px'}}>{item.name}</p>
                            <p style={{float: 'left', marginLeft: '10px'}}>{item.menu}</p>
                            <p style={{float: 'right', marginRight: '10px'}}>${item.price.toFixed(2)}</p>
                            <hr style={{clear: 'both', border: '1px solid transparent'}}/>
                        </div>;
                    })
                }
            </div>
            <div style={{height: '5%'}}>
                <p style={{float: 'right', marginRight:'10px'}}>Total: ${total.toFixed(2)}</p>
            </div>
        </>
    );
};
