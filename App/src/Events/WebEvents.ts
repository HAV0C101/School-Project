import {ipcMain} from 'electron'
ipcMain.handle('get-api-data', async (evt, err) => {
    const menuData = {
        "mains": [
            {
                "name": "Chicken Burger",
                "price": "3.50"
            }
        ],
        "sides": [
            {
                "name": "Fries",
                "price": "2.50"
            }
        ]
    }
    return menuData
})
