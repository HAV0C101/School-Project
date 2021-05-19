import React from "react";
import RGL, {Layout, WidthProvider} from "react-grid-layout";
interface MenuItems {
    [n: string]: Array<{
        name: string
        price: number
    }>
}
export const Menu = ({items, objects}:{items:{menu_name: string, nodes: JSX.Element[]}, objects:MenuItems}):JSX.Element => {
    let x = 0;
    let y = 0;
    const layoutArray:Layout[] = [];
    for(const [key, object] of Object.entries(objects)){
        if(key == items.menu_name) {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            for(const item in object){
                layoutArray.push({i: x.toString() + y.toString(), static: true, x: x, y: y, w:1, h:1});

                x = x+1;
                if(x === 3) {
                    y = y + 1;
                    x = 0;
                }
            }
        }
    }


    const GridLayout = WidthProvider(RGL);
    return <div className={'menuContainer'}>
        <GridLayout layout={layoutArray} cols={3}  rowHeight={300}>
            {items.nodes}
        </GridLayout>
    </div>;
};
