import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";
import {Loading} from "./Componates/Views/Loading/Loading";
import {HashRouter, Route, Link, Switch} from "react-router-dom";
import {Menu} from "./Componates/Views/Menu/Menu";
import RGL, { WidthProvider } from 'react-grid-layout'
type menu_item = {
    name: string
    price: number
}
import '../node_modules/react-grid-layout/css/styles.css'
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

    const layout = [
        {i: 'order_list', x:0, y:0, w:1, h:6, static:true},
        {i: 'main_window', x:1, y:0, w:4, h:2, static: true}
    ]
    const GridLayout = WidthProvider(RGL)

    console.log(window.innerWidth)
    return(
        <div id={'container'}>
            <HashRouter>
                <GridLayout layout={layout} cols={5}>
                    <div style={{backgroundColor:'red'}} key={'order_list'}>
                        {
                            data != null ?
                                data.map((item:{menu_name:string, nodes:Array<JSX.Element>}) => {
                                    return (
                                        <>
                                            <Link to={`/menus/${item.menu_name}/items`}>{item.menu_name}</Link>
                                            <br/>
                                        </>
                                    )
                                })
                                :
                                <Loading/>
                        }
                    </div>
                    <div style={{backgroundColor: 'blue'}} key={'main_window'}>
                        {
                            data != null ?
                                data.map((item:{menu_name:string, nodes:Array<JSX.Element>}) => {
                                    return (
                                        <Route key={item.menu_name} path={`/menus/${item.menu_name}/items`} component={() => <Menu props={item}/>}/>
                                    )
                                })
                                :
                                <Loading/>
                        }
                    </div>
                </GridLayout>
            </HashRouter>

        </div>
    )
}

function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
