/**
 * @package TED31 School project
 * This file is a part of my TED31 2021 project
 * @copyright Cory Keastpither 2021
 */

// Imports
import React, { useEffect, useState } from 'react';

// Types and interfaces
type itemType = {
  menu: string | null;
  name: string;
  price: number;
};
interface orderItem extends itemType {
  arrayIndex: number;
  count: number;
}

// Functions
const BottomButtons = ({ total }: { total: number }): JSX.Element => {
  // TODO: Add Extra buttons e.g: Clear Order and pay
  return (
    <div style={{ height: '5%' }}>
      <p style={{ float: 'right', marginRight: '10px', fontSize: '25px' }}>
        Total: ${total.toFixed(2)}
      </p>
    </div>
  );
};

const OrderRow = ({
  item,
  index,
  setOrder
}: {
  item: orderItem;
  index: number;
  setOrder: React.Dispatch<React.SetStateAction<itemType[]>>;
}) => {
  /**
   * @function OrderRow
   * Creates the rows for the Order List
   * @var item: Item to be displayed on list
   * @var index: Index of item
   * @var setOrder: React Setter
   *
   * @returns JSX.Element
   */
  return (
    <div
      className={'order-item'}
      onClick={() =>
        setOrder((order: itemType[]) => {
          const testArray = [...order];
          testArray.splice(item.arrayIndex, 1);
          return testArray;
        })
      }
      key={index}
    >
      <div className={'grid-container'}>
        <div className={'grid-item'}>
          <p className={'item-text'}>{item.count}x</p>
        </div>
        <div className={'grid-item'}>
          <p className={'item-text'}>
            {item.name} @ ${item.price}ea
          </p>
          <p className={'item-text'} id={'menu_name'}>
            {item.menu}
          </p>
        </div>
        <div className={'grid-item'}>
          <p className={'item-text'} id={'total'}>
            ${(item.price * item.count).toFixed(0)}
          </p>
        </div>
      </div>
      <hr />
    </div>
  );
};
export const OrderList = ({
  setOrder,
  items
}: {
  setOrder: React.Dispatch<React.SetStateAction<itemType[]>>;
  items: itemType[];
}): JSX.Element => {
  /**
   * @function OrderList
   * Creates Order list to display current order
   * @var setOrder: React Setter for order
   * @var items: Items in order
   */

  // Functions
  let total = 0;
  const [orderArray, setOrderArray] = useState([]);
  for (const itemsKey in items) {
    total = total + items[itemsKey].price;
  }

  // UseEffects
  useEffect(() => {
    items.forEach((item, index) => {
      const newObject = {
        count: 1,
        name: item.name,
        menu: item.menu,
        price: item.price,
        arrayIndex: index
      };
      // create order array
      setOrderArray((Array) => {
        if (
          Array.some(
            (item) =>
              item.name === newObject.name && item.menu === newObject.menu
          )
        ) {
          const index = Array.findIndex((item) => item.name === newObject.name);
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
      <div className={'order-list'}>
        {orderArray.map((item, index) => {
          return (
            <OrderRow
              key={index}
              item={item}
              index={index}
              setOrder={setOrder}
            />
          );
        })}
      </div>
      <BottomButtons total={total} />
    </>
  );
};
