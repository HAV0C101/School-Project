import { ipcMain } from 'electron'

ipcMain.handle('get-api-data', (evt, err) => {

    return "Yeah"
})
