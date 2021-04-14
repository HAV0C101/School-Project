import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";

type menu_item = {
    name: string
    price: number
}
type menu = Array<menu_item>
const App = ():JSX.Element => {
    const [data, setData] = useState(null)
    useEffect(() => {
        ipcRenderer.invoke('get-api-data').then(async menu_data => {
            console.log(menu_data)
            let i = 0
            let menus = []
            for(const [key, menu_object]:[key:number, menu_object:menu] of Object.entries(menu_data)){
                const complete_menu = menu_object.map((data:menu_item) => <p key={i++}>{data.name}, {data.price}</p>)
                menus.push(complete_menu)
            }
            setData(menus)
        })
    }, [])
    return(
        <div id={'container'}>
            {
                data != null ?
                    data.map(item => {
                        return item
                    })
                : <p>loading</p>
            }
        </div>
    )
};
function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
