var router = require("express").Router();
var Burger = require("../models/burger");

router.get("/", function (request, response) {
    Burger.selectYourBurgers().then(result => {
        var devoured = result.filter(b => b.devoured === 1);
        var undevoured = result.filter(b => b.devoured === 0);
        response.render("index", {
            undevouredList: undevoured,
            devouredList: devoured
        });
    }).catch((error) => {
        response.status(500).send({error: error});
    });
});

router.get("/api/burger", (request, response) => {
    Burger.selectYourBurgers().then((error, result) => {
        response.send(result);
    }).catch((error) => {
        response.status(500).send({error: error});
    });
});

router.post("/api/burger", (request, response) => {
    if (!request.body.name) {
        response.status(500).send({error: "Please, insert burger's name!"});
    }
    let newBurger = new Burger(request.body.name);
    Burger.create(newBurger).then(id => {
        response.json(id);
    }).catch((error) => {
        response.status(500).send({error: error});
    });
});

router.put("/api/burger/:id", (request, response) => {
    Burger.updateDevoured(request.params.id).then(result => {
        response.json(result);
    }).catch((error) => {
        response.status(500).send({error: error});
    });
});


module.exports = router;
