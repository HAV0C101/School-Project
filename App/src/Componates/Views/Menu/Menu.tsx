import React from "react";
import {Link} from "react-router-dom";

export const Menu = (props:any):JSX.Element => {
    console.log(props)
    return <div className={'menuContainer'}>
        <p>{props.props.menu_name}</p>
        <p>{props.location}</p>
        {props.props.nodes}
        <Link to={'/'}>home</Link>
    </div>
}
