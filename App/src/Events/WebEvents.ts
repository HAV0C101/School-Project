import {ipcMain} from 'electron'
ipcMain.handle('get-api-data', async (evt, err) => {
    interface MenuItems {
        [n: string]: Array<{
            name: string
            price: number
        }>
    }
    const menuData:MenuItems = {
        "mains": [
            {
                "name": "Chicken Burger",
                "price": 3.50
            },
            {
                "name": "Chicken Burger",
                "price": 3.50
            }
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
    }
    return menuData
})
