var db = require("../models");
var log = require("loglevel").getLogger("burgers_controller");

module.exports = function(app) {
  app.get("/", function(request, response) {
    log.debug("___ENTER GET /___");

    db.Burger.findAll({
      include: [ db.Customer ],
      order: "name ASC"
    })
    .then(function(data) {
      log.debug("data = " + JSON.stringify(data));

      var handleObj = {
        burgers: data
      };
      console.log(handleObj);
      response.render('index', handleObj);
    })
    .catch(function(error) {
      log.error("ERR = " + error);
      response.json({status: "ERROR", message: error});
    });
  });

  app.post("/burgers", function(request, response) {
    log.debug("___ENTER POST /burgers___");

    db.Burger.create(request.body)
    .then(function(burger) {
      response.redirect("/");
    })
    .catch(function(error) {
      log.error("ERR = " + error);
      response.json({status: "ERROR", message: error});
    });
  });

  app.put("/burgers/:id", function(request, response) {
    log.debug("___ENTER PUT /burgers:id___");

    log.debug("id = " + request.params.id);
    log.debug("customer = " + JSON.stringify(request.body.clientName));

    var burgerID = request.params.id;
    var clientName = request.body.clientName;

    db.Customer.findAll({
      where: {
        name: clientName
      }
    })
    .then(function(customer) {
      if (customer.length === 0) {
        log.debug("customer does not exist!");

        db.Customer.create({
          name: clientName
        })
        .then(function(newCustomer) {
          log.debug("customer created = " + JSON.stringify(newCustomer));

          db.Burger.update(
            {
              devoured: true,
              CustomerId: newCustomer.id
            },
            {
              where: {
                id: request.params.id
              }
            }
          ).then(function(burger) {
            response.redirect('/');
          })
          .catch(function (error) {
            log.error("ERR = " + error);
            response.json({status: "ERROR", message: error});
          });
        })
        .catch(function(error) {
          log.debug("ERROR: Error on customer create -- " + JSON.stringify(error));
          response.json({status: "ERROR", message: error});
        })
      } else { 
        log.debug("customer exists = " + JSON.stringify(customer));

        db.Burger.update(
          {
            devoured: true,
            CustomerId: customer[0].id
          },
          {
            where: {
              id: request.params.id
            }
          }
        ).then(function(burger) {
          response.redirect('/');
        })
        .catch(function (error) {
          log.error("ERR = " + error);
          response.json({status: "ERROR", message: error});
        });
      } 
    })
    .catch(function(error) {
      if(error) {
        log.debug("ERROR: Error on customer query -- " + JSON.stringify(error));
        response.json({status: "ERROR", message: error});
      }
    });
  });
};
