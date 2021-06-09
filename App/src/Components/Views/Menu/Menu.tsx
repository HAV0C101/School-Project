/**
 * @package TED31 School project
 * This file is a part of my TED31 2021 project
 * @copyright Cory Keastpither 2021
 */

// Imports
import React from 'react';
import RGL, { Layout, WidthProvider } from 'react-grid-layout';

// Types and interfaces
interface MenuItems {
  [n: string]: Array<{
    name: string;
    price: number;
  }>;
}

// Functions
export const Menu = ({
  items,
  objects
}: {
  items: { menu_name: string; nodes: JSX.Element[] };
  objects: MenuItems;
}): JSX.Element => {
  /**
   * @function Menu
   * Creates the Menu JSX Element for the ui
   * @var items: the item nodes them self's received from the main renderer
   * @var objects: the menu objects received from the backend
   *
   * @returns JSX.Element
   */

  // Vars
  let x = 0;
  let y = 0;
  const layoutArray: Layout[] = [];
  const GridLayout = WidthProvider(RGL);

  for (const [key, object] of Object.entries(objects)) {
    if (key == items.menu_name) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      for (const item in object) {
        layoutArray.push({
          i: x.toString() + y.toString(),
          static: true,
          x: x,
          y: y,
          w: 1,
          h: 1
        });

        x = x + 1;
        if (x === 3) {
          y = y + 1;
          x = 0;
        }
      }
    }
  }

  return (
    <div className={'menuContainer'}>
      <GridLayout layout={layoutArray} cols={3} rowHeight={300}>
        {items.nodes}
      </GridLayout>
    </div>
  );
};
