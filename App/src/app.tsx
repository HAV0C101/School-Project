import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";

const App = ():JSX.Element => {
    const [data, setData] = useState(null)

    ipcRenderer.invoke('get-api-data').then(async data => {
        console.log(data)
        setData(data)
    })
    useEffect(() => {
        setData(data.mains.map(()))
    },[data])
    return(
        <div id={'container'}>
            {data.mains.map((data) => {
                return <p>{data.name}</p>
            })}
        </div>
    )
}
function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
