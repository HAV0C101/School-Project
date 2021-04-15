import React from "react";
import {Link, useLocation} from "react-router-dom";

export const Menu = ({props}:{props:any}):JSX.Element => {
    const location = useLocation();
    console.log(props)
    return <div className={'menuContainer'}>
        <p>{props.menu_name}</p>
        <p>{location.pathname}</p>
        {props.nodes}
        <Link to={'/'}>home</Link>
    </div>
}
