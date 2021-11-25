"use strict";

const Route = use("Route");

Route.post("/authenticate", "AuthController.authenticate");
Route.post("/users/noauth", "UserController.storeNoAuth");
Route.post("/users", "UserController.storeAuth").middleware(["auth"]);


/*Route.group(() => { //agrupando todas as rotas que precisam de autenticação
  Route.resource("user", "UserController")  
    .apiOnly()
    .except("update");
}).middleware(["auth"]); //tudo que for definido acima vai ficar aqui 

*/

Route.post("/company", "CompanyController.store");
