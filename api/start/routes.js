"use strict";

const UserController = require("../app/Controllers/Http/UserController");

const Route = use("Route");
Route.post("/company", "CompanyController.store"); //Cria empresa

Route.post("/register", "AuthController.register"); //Cria o usuario sem auth
Route.post("/authenticate", "AuthController.authenticate"); //Pega o token
Route.post("/users", "UserController.storeAuth").middleware(["auth"]); //Cria o usuario com auth
Route.get("/users", "UserController.index").middleware(["auth"]); //Lista todos usuarios ligados a empresa

Route.group(() => {
  Route.resource("user", "UserController").apiOnly();
}).middleware(["auth"]);
Route.put("users/update/:id", async ({ params, request }) => {
  return new UserController().edit({ params, request });
}).middleware(["auth"]);
