"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuBox = void 0;
const React = require("react");
class MenuBox extends React.Component {
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
            var tmp = this.state;
            tmp.items = dataitems;
            this.setState(tmp);
        }.bind(this);
        xhr.send();
    }
    render() {
        let menus = this.state.items || [];
        var menuList = menus.map(function (menu) {
            return (React.createElement("div", { key: menu.Id },
                React.createElement("b", null, menu.Name),
                " ",
                React.createElement("br", null),
                React.createElement("img", { style: { width: '100px', float: 'left', margin: '5px' }, src: "/Img/" + menu.Picture }),
                React.createElement("p", null, menu.Description),
                React.createElement("div", null,
                    "$",
                    menu.Price),
                " ",
                React.createElement("hr", null)));
        }, this);
        return (React.createElement("div", null,
            React.createElement("div", { id: "wrapper" },
                React.createElement("div", { id: "dvmenu" }, menuList))));
    }
}
exports.MenuBox = MenuBox;
//# sourceMappingURL=MenuBox.js.map