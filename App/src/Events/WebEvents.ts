import {ipcMain, app} from 'electron';
ipcMain.handle('get-api-data', async () => {
    interface MenuItems {
        [n: string]: {
            name: string
            price: number
            image?: string
        }[]
    }
    const menuData:MenuItems = {
        "Burgers": [
            {
                "name": "Plain",
                "price": 2.50,
                "image": 'https://img2.pngio.com/burger-jollibee-foods-corporation-plain-hamburger-png-235_189.png'
            },
            {
                "name": "Cheese",
                "price": 4,
                "image": 'https://i.pinimg.com/originals/79/c8/6a/79c86aff00ef3b45473e276a502e8389.png'
            },
            {
                "name": "Egg",
                "price": 4,
                "image": 'https://freepikpsd.com/wp-content/uploads/2019/10/burger-with-egg-png-7-Transparent-Images-Free.png'
            },
            {
                "name": "Pineapple",
                "price": 4,
                "image": 'https://bk-apac-prd.s3.amazonaws.com/sites/burgerking.com.fj/files/webs-02.png'
            },
            {
                "name": "Fish",
                "price": 4.80,
                "image": 'http://www.texaschicken.com.sg/menu/burger-fish-burger.png'
            },
            {
                "name": "Bacon",
                "price": 4.20,
                "image": 'https://i2.wp.com/freepngimages.com/wp-content/uploads/2016/11/bacon-burger.png?fit=895%2C895'
            },
            {
                "name": "Mushroom",
                "price": 4.20,
                "image": 'https://i.pinimg.com/originals/9b/97/5a/9b975a58ef0507e8560a18ee643cafd4.png'
            }
        ],
        "Chips": [
            {
                "name": "1 Scoop Regular",
                "price": 2.80,
                "image": 'https://www.nzherald.co.nz/resizer/E8blWW3dMWxJ5oj59DQScdRh8JQ=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/MJTZGZN7TXV6JSYM72HD7KSTHM.jpg'
            },
            {
                "name": "1/2 Scoop Regular",
                "price": 2,
                "image": 'https://www.nzherald.co.nz/resizer/E8blWW3dMWxJ5oj59DQScdRh8JQ=/576x613/smart/filters:quality(70)/cloudfront-ap-southeast-2.images.arcpublishing.com/nzme/MJTZGZN7TXV6JSYM72HD7KSTHM.jpg'
            },
            {
                "name": "1 Scoop Kumara",
                "price": 4,
                "image": 'https://img2.pngio.com/sweet-potato-fries-png-picture-1932178-sweet-potato-fries-png-fried-sweet-potato-png-300_280.png'
            },
            {
                "name": "1/2 Scoop Kumara",
                "price": 3.40,
                "image": 'https://img2.pngio.com/sweet-potato-fries-png-picture-1932178-sweet-potato-fries-png-fried-sweet-potato-png-300_280.png'
            },
            {
                "name": "1 Scoop Wedges",
                "price": 4,
                "image": 'https://pcpizza.co.nz/wp-content/uploads/2018/11/wedges.png'
            },
            {
                "name": "1/2 Scoop Wedges",
                "price": 3.40,
                "image": 'https://pcpizza.co.nz/wp-content/uploads/2018/11/wedges.png'
            }
        ],
        "Sides": [
            {
                "name": "6 Onion Rings",
                "price": 4,
                "image": 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjE1OWYwNjZkZGFkNWZiNWUwMDZkODg2MjM0MjIzOWU0LmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=9c163b78af44891917a6905f5fb6a687fdb9cd9b3da19d3e867af191ea9dd75d'
            },
            {
                "name": "6 Chicken Nuggets",
                "price": 4.20,
                "image": 'https://www.burgerking.co.nz/sites/default/files/J000772_HashBites_Rollout_ProductWebsiteDesktop_300x270_01_2.png'
            },
            {
                "name": "Hot Dog",
                "price": 2.10,
                "image": 'https://keithsfoods.com.au/wp-content/uploads/2017/12/Dagwood-Dog.png'
            },
            {
                "name": "Spring Roll",
                "price": 2.60,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Potato Fritter",
                "price": 0.80,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Meat Pattie",
                "price": 2.20,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Plain Sausage",
                "price": 2.20,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Battered Sausage",
                "price": 2.50,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
        ],
        "Seafood":[
            {
                "name": "6 Squid Rings",
                "price": 5,
                "image": 'https://dtgxwmigmg3gc.cloudfront.net/imagery/assets/derivations/icon/512/512/true/eyJpZCI6IjE1OWYwNjZkZGFkNWZiNWUwMDZkODg2MjM0MjIzOWU0LmpwZyIsInN0b3JhZ2UiOiJwdWJsaWNfc3RvcmUifQ?signature=9c163b78af44891917a6905f5fb6a687fdb9cd9b3da19d3e867af191ea9dd75d'
            },
            {
                "name": "5 Fish Bites",
                "price": 3,
                "image": 'http://3.bp.blogspot.com/-v7xZ51PQWnI/UTEe-1bO4hI/AAAAAAAAg0U/NvPGfHnYXlg/s1600/fish+mcbites.png'
            },
            {
                "name": "Fish",
                "price": 2.40,
                "image": 'https://www.gsgoldenchippy.co.uk/content/images/fish-and-chips.png'
            },
            {
                "name": "Hoki",
                "price": 4.50,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Blue Cod",
                "price": 6.80,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Snapper",
                "price": 6,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Fish Of The Day",
                "price": 3.80,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Crab",
                "price": 1.20,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
        ],
        "Desserts": [
            {
                "name": "Plain Donut",
                "price": 2,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Chocolate Donut",
                "price": 2,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Jam Donut",
                "price": 2,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
            {
                "name": "Deep Fried Moro Bar",
                "price": 3.80,
                "image": 'https://www.designindaba.com/sites/default/files/styles/scaledlarge/public/node/news/23566/sonic-burger.jpg?itok=zGk5pjcI'
            },
        ],
    };
    return menuData;
});

ipcMain.on('app-exit', () => {
    app.exit();
});
