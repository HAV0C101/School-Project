import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {ipcRenderer} from "electron";
import {useEffect, useState} from "react";
import {Loading} from "./Components/Views/Loading/Loading";
import {HashRouter, Route, NavLink, Redirect} from "react-router-dom";
import {Menu} from "./Components/Views/Menu/Menu";
import RGL, { WidthProvider } from 'react-grid-layout';
type menu_item = {
    menu: string | null
    name: string
    price: number
    image: string
}

import '../node_modules/react-grid-layout/css/styles.css';
import {OrderList} from "./Components/Partials/OrderList";
type menu = Array<menu_item>
const App = ():JSX.Element => {
    const [data, setData] = useState(null);
    const [order, setOrder] = useState([]);
    const [buttonLayout, setButtonLayout] = useState([{i: 'exit', x:9, y:0, w:1, h:0.305, static: true}]);
    const [rawData, setRawData] = useState(null);

    useEffect(() => {
        ipcRenderer.invoke('get-api-data').then(async menu_data => {
            console.log("method called");
            if(menu_data === null) {
                return;
            }

            setRawData(menu_data);
            const menus:Array<{menu_name:string, nodes:Array<JSX.Element>}> = [];
            let layoutX = 0;

            for(const [key, menu_object] of Object.entries(menu_data)){
                let x = 0;
                let y = 0;
                setButtonLayout(oldArray => [...oldArray, {i: key, x:layoutX, y:0, w:1, h:0.305, static: true}]);
                layoutX = layoutX+1;
                const new_menu_object = menu_object as menu;
                const complete_menu: Array<JSX.Element> = new_menu_object.map((data:menu_item) => {
                    data.menu = key;
                    const id = x.toString() + y.toString();
                    x = x+1;
                    if(x === 3) {
                        y = y + 1;
                        x = 0;
                    }
                    return <div className={'menu-item'} style={{}} onClick={() => setOrder(oldArray => [...oldArray, data])} key={id}>
                        <img alt={'menu item image'} height={250} width={250} src={data.image}/>
                        <p id={'menu-item-text'}>{data.name}, ${data.price.toFixed(2)}</p>

                    </div>;
                });

                const complete_menu_object = {
                    menu_name: key,
                    nodes: complete_menu
                };
                menus.push(complete_menu_object);
            }
            setData(menus);
        });
    }, []);

    const layout = [
        {i: 'menu_buttons', x: 1, y: 0, w: 4, h:0.30, static: true},
        {i: 'order_list', x:0, y:0, w:1, h:6.5, static:true},
        {i: 'main_window', x:1, y:0.35, w:4, h:6.15, static: true}
    ];
    const GridLayout = WidthProvider(RGL);
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

function render() {
    ReactDOM.render(<App/>, document.getElementById("root"));
}

render();
