import React from "react";
import {Link, useLocation} from "react-router-dom";
import RGL, {Layout, WidthProvider} from "react-grid-layout";

export const Menu = ({items, objects}:{items:any, objects:any}):JSX.Element => {
    console.log(items)
    console.log(objects)
    let x = 0
    let y = 0
    const layoutArray:Layout[] = []
    for(const [key, object] of Object.entries(objects)){
        console.log(key)
        if(key == items.menu_name) {
            for(const [key2, object2] of Object.entries(object)){
                layoutArray.push({i: x.toString() + y.toString(), static: true, x: x, y: y, w:1, h:1})
                console.log("pushed")
                x = x+1
                if(x === 6) {
                    y = y + 1
                    x = 0
                }
            }
        }
    }
    console.log(layoutArray)

    const GridLayout = WidthProvider(RGL)
    return <div className={'menuContainer'}>
        <GridLayout layout={layoutArray} cols={6} >
            {items.nodes}
        </GridLayout>
    </div>
}
