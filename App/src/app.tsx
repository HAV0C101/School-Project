import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";

const App = ():JSX.Element => {
    const [data, setData] = useState(null)

    ipcRenderer.invoke('get-api-data').then(data => {
        setData(data)
    })
    return(
        <div id={'container'}>
            {data}
        </div>
    )
}
function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
