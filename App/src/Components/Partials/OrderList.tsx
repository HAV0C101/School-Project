import React, {useEffect, useState} from "react";

type itemType = {
    menu: string | null
    name: string,
    price: number,
}
interface orderItem extends itemType {
    arrayIndex: number,
    count: number
}
const OrderRow = ({item, index, setOrder}:{item:orderItem, index:number, setOrder:React.Dispatch<React.SetStateAction<itemType[]>>}) => {
    return (
        <div className={'order-item'} onClick={() => setOrder((order: itemType[]) =>{
            const testArray = [...order];
            testArray.splice(item.arrayIndex, 1);
            return testArray;
        })} key={index}>
            <div className={'grid-container'}>
                <div className={'grid-item'}><p className={'item-text'}>{item.count}x</p></div>
                <div className={'grid-item'}>
                    <p className={'item-text'}>{item.name} @ ${item.price}</p>
                    <p className={'item-text'} id={'menu_name'}>{item.menu}</p>
                </div>
                <div className={'grid-item'}>
                    <p className={'item-text'} id={'total'}>${(item.price * item.count).toFixed(0)}</p>
                </div>
            </div>
        </div>
    );
};
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
                        return <OrderRow item={item} index={index} setOrder={setOrder} />;
                    })
                }
            </div>
            <div style={{height: '5%'}}>
                <p style={{float: 'right', marginRight:'10px', fontSize: '25px'}}>Total: ${total.toFixed(2)}</p>
            </div>
        </>
    );
};
