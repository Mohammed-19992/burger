var orm = require("../config/orm");

function Burger(name) {
    this.name = name;
    this.devoured = false;
}

Burger.selectYourBurgers = function () {
    return new Promise((resolve, reject) => {
        orm.selectAll("burgers").then(results => {
            resolve(results);
        }).catch(() => {
            reject("Burger not retrieved");
        });
    });
};

Burger.create = function (burger) {
    return new Promise((resolve, reject) => {
        orm.insertOne("burgers", {
            burger_name: burger.name,
            devoured: burger.devoured
        }).then(results => {
            burger.id = results.insertId;
            resolve(burger.id);
        }).catch(() => {
            reject("Burger not added");
        });
    });
};

Burger.updateDevoured = function (burgerId) {
    return new Promise((resolve, reject) => {
        orm.updateOne("burgers", "DEVOURED", true, "ID", burgerId).then(results => {
            resolve(results);
        }).catch(() => {
            reject("Burger not updated");
        });
    });
};


module.exports = Burger;