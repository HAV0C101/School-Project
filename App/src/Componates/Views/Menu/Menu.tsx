import React from "react";
import {Link, useLocation} from "react-router-dom";
import RGL, {WidthProvider} from "react-grid-layout";

export const Menu = ({item}:{item:any}):JSX.Element => {
    const GridLayout = WidthProvider(RGL)
    return <div className={'menuContainer'}>
        {item.nodes}
    </div>
}
