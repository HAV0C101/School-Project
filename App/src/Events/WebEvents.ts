import {ipcMain, app} from 'electron';
ipcMain.handle('get-api-data', async () => {
    interface MenuItems {
        [n: string]: Array<{
            name: string
            price: number
        }>
    }
    const menuData:MenuItems = {
        "Burgers": [
            {
                "name": "Plain",
                "price": 2.50
            },
            {
                "name": "Cheese",
                "price": 4
            },
            {
                "name": "Egg",
                "price": 4
            },
            {
                "name": "Pineapple",
                "price": 4
            },
            {
                "name": "Fish",
                "price": 4.80
            },
            {
                "name": "Bacon",
                "price": 4.20
            },
            {
                "name": "Mushroom",
                "price": 4.20
            },

        ],
        "mains2": [
            {
                "name": "Chicken Burger",
                "price": 3.50
            },
            {
                "name": "Chicken Burger",
                "price": 3.50
            }
        ],
        "sides": [
            {
                "name": "Fries",
                "price": 2.50
            }
        ]
    };
    return menuData;
});

ipcMain.on('app-exit', () => {
    app.exit();
});
