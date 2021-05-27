/**
 * @package TED31 School project
 * This file is a part of my TED31 2021 project
 * @copyright Cory Keastpither 2021
 */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";
import {Loading} from "./Components/Views/Loading/Loading";
import {HashRouter, Route, NavLink, Redirect} from "react-router-dom";
import {Menu} from "./Components/Views/Menu/Menu";
import RGL, { WidthProvider } from 'react-grid-layout';
import '../node_modules/react-grid-layout/css/styles.css';
import {OrderList} from "./Components/Partials/OrderList";
// Types and Interfaces
type menu_item = {
    menu: string | null
    name: string
    price: number
    image: string
}
type menu = Array<menu_item>

// Functions
const App = ():JSX.Element => {
    /**
     * @function App
     * Creates the main app renderer object for the GUI to load
     * @returns JSX.Element
     */

    // Vars
    const [data, setData] = useState(null);
    const [order, setOrder] = useState([]);
    const [buttonLayout, setButtonLayout] = useState([{i: 'exit', x:9, y:0, w:1, h:0.305, static: true}]);
    const [rawData, setRawData] = useState(null);
    const layout = [
        {i: 'menu_buttons', x: 1, y: 0, w: 4, h:0.30, static: true},
        {i: 'order_list', x:0, y:0, w:1, h:6.5, static:true},
        {i: 'main_window', x:1, y:0.35, w:4, h:6.15, static: true}
    ];
    const GridLayout = WidthProvider(RGL);

    // UseEffects
    useEffect(() => {
        /**
         * Gets the Menus from the backend via the ipc API
         */
        ipcRenderer.invoke('get-api-data').then(async menu_data => {
            // Vars
            const menus:Array<{menu_name:string, nodes:Array<JSX.Element>}> = [];
            let layoutX = 0;

            if(menu_data === null) {
                return;
            }
            setRawData(menu_data);

            // Begin converting menu into JSX Objects
            for(const [key, menu_object] of Object.entries(menu_data)){
                let x = 0;
                let y = 0;
                setButtonLayout(oldArray => [...oldArray, {i: key, x:layoutX, y:0, w:1, h:0.305, static: true}]);
                layoutX = layoutX+1;
                const new_menu_object = menu_object as menu; // Cast type to object

                // Map objects to JSX Nodes
                const complete_menu: Array<JSX.Element> = new_menu_object.map((data:menu_item) => {
                    // Vars
                    data.menu = key;
                    const id = x.toString() + y.toString();

                    // Create Key ID for GUI to place correctly
                    x = x+1;
                    if(x === 3) {
                        y = y + 1;
                        x = 0;
                    }
                    // Return JSX Node to array
                    return <div className={'menu-item'} style={{}} onClick={() => setOrder(oldArray => [...oldArray, data])} key={id}>
                                <img alt={'menu item image'} height={250} width={250} src={data.image}/>
                                <p id={'menu-item-text'}>{data.name}, ${data.price.toFixed(2)}</p>
                           </div>;
                });

                // Create Menu Object
                const complete_menu_object = {
                    menu_name: key,
                    nodes: complete_menu
                };
                // Add to Array
                menus.push(complete_menu_object);
            }
            // Set State
            setData(menus);
        });
    }, []);

    return(
        <div id={'container'}>
            <HashRouter>
                <GridLayout measureBeforeMount={true} layout={layout} cols={5}>
                    <div key={'menu_buttons'} className={'button-layer'}>
                        <GridLayout layout={buttonLayout} cols={9}>
                            {
                                data != null ?
                                    data.map((item:{menu_name:string, nodes:Array<JSX.Element>}) => {
                                        return (
                                            <NavLink activeClassName={'menu-button-active'} className={'menu-button'} key={item.menu_name} style={{textDecoration:"none"}} to={`/menus/${item.menu_name}/items`}>
                                                <div>
                                                    <p className={'menu-button-name'}>{item.menu_name}</p>
                                                    <br/>
                                                </div>
                                            </NavLink>
                                        );
                                    })
                                    :
                                    <Loading/>
                            }
                            <div key={'exit'} className={'exit-button'} onClick={() => ipcRenderer.send('app-exit')}>
                                <div>
                                    <p className={'exit-button-name'}> Exit</p>
                                </div>
                            </div>
                        </GridLayout>
                    </div>
                    <div className={'order-list-container'} key={'order_list'}>
                        <OrderList setOrder={setOrder} items={order}/>
                    </div>
                    <div className={'main-window'} key={'main_window'}>
                        {
                            data != null ?
                                data.map((item:{menu_name:string, nodes:Array<JSX.Element>},index:number) => {
                                    if(index === 0){
                                        return (
                                            <>
                                                <Route exact path="/">
                                                    <Redirect to={`/menus/${item.menu_name}/items`} />
                                                </Route>
                                                <Route key={item.menu_name} path={`/menus/${item.menu_name}/items`} component={() => <Menu objects={rawData} items={item}/>}/>
                                            </>
                                        );
                                    }
                                    return (
                                        <Route key={item.menu_name} path={`/menus/${item.menu_name}/items`} component={() => <Menu objects={rawData} items={item}/>}/>
                                    );
                                })
                                :
                                <Loading/>
                        }
                    </div>
                </GridLayout>
            </HashRouter>

        </div>
    );
};
// Render App
ReactDOM.render(<App/>, document.getElementById("root"));
