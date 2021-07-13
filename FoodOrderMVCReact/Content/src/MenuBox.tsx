import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { FoodModel, IAppState } from './Models';

export class MenuBox extends React.Component<any, IAppState>{
    constructor(state) {
        super(state);
        this.state = {
            items: null,
            myOrder: null,
            showPopup: false,
            userId: 0,
            orderPlaced: false
        };
        this.loadMenusFromServer();
    }

    loadMenusFromServer() {
        var xhr = new XMLHttpRequest();
        xhr.open('get', '/data/GetMenuList/', true);
        xhr.onload = function () {
            var dataitems = JSON.parse(xhr.responseText);
            var tmp: IAppState = this.state;
            tmp.items = dataitems;
            this.setState(tmp);
        }.bind(this);
        xhr.send();
    }

    render() {
        let menus = this.state.items || [];
        var menuList = menus.map(function (menu) {
            return (
                <div key={menu.Id}>
                    <b>{menu.Name}</b> <br />
                    <img style={{ width: '100px', float: 'left', margin: '5px' }} src={"/Img/" + menu.Picture} />
                    <p>{menu.Description}</p>
                    <div>${menu.Price}</div> <hr />
                </div>
            );
        },
            this);
        return (<div>
            <div id="wrapper">
                <div id="dvmenu">
                    {menuList}
                </div>
            </div>
        </div >);
    }
}