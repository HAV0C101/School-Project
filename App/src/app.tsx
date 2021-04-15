import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";
import {Loading} from "./Componates/Views/Loading/Loading";
import {HashRouter, Route, Link, Switch} from "react-router-dom";
import {Menu} from "./Componates/Views/Menu/Menu";
type menu_item = {
    name: string
    price: number
}
type menu = Array<menu_item>
const App = ():JSX.Element => {
    const [data, setData] = useState(null)
    useEffect(() => {
        ipcRenderer.invoke('get-api-data').then(async menu_data => {
            if(menu_data === null) {
                return
            }
            console.log(menu_data)
            let i = 0
            const menus:Array<{menu_name:string, nodes:Array<JSX.Element>}> = []
            for(const [key, menu_object] of Object.entries(menu_data)){
                const new_menu_object = menu_object as menu
                const complete_menu: Array<JSX.Element> = new_menu_object.map((data:menu_item) => <p key={i++}>{data.name}, {data.price}</p>)
                console.log(key)
                const complete_menu_object = {
                    menu_name: key,
                    nodes: complete_menu
                }
                menus.push(complete_menu_object)
            }
            setData(menus)
        })
    }, [])
    return(
        <div id={'container'}>
            {
                data != null ?
                    <HashRouter>
                        <Switch>
                            <Route exact path={'/'} component={() => {
                                return (<>
                                    {
                                        data.map((item:{menu_name:string, nodes:Array<JSX.Element>}) => {
                                            return (
                                                <>
                                                    <Link to={`/menus/${item.menu_name}/items`}>{item.menu_name}</Link>
                                                    <br/>
                                                </>
                                            )
                                        })
                                    }
                                </>)
                            }
                            }/>
                            {
                            data.map((item:{menu_name:string, nodes:Array<JSX.Element>}) => {
                                console.log(`${item.menu_name}:`)
                                console.log(item.nodes)
                                return (
                                     <Route key={item.menu_name} path={`/menus/${item.menu_name}/items`} component={() => <Menu props={item}/>}/>
                                )
                            })
                            }
                        </Switch>
                    </HashRouter>
                : <Loading/>
            }
        </div>
    )
}

function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
