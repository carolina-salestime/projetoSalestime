"use strict";
const Company = use("App/Models/Company");
const User = use("App/Models/User");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
class UserController {
  /**
   * Show a list of all companies.
   * GET companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ request, auth }) {
    const users = await User.all();
    let result = [];

    for (const iterator of users["rows"]) {
      // no caso a linha sao os usuarios listados
      if (iterator.company_id === auth.user.company_id) {
        result.push(iterator);
      }
    }

    return result;
  }

  /**
   * Create/save a new company.
   * POST companies
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async storeNoAuth({ request, response }) {
    const data = request.only(["username", "email", "password", "company_id"]);

    const user = await User.create(data);

    return user;
  }

  async storeAuth({ request, auth }) {
    const data = request.only(["username", "email", "password"]);

    let resul = {
      username: data.username,
      email: data.email,
      password: data.password,
      company_id: auth.user.company_id,
    };
    const user = await User.create(resul);

    return user;
  }
  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response, view }) {}

  /**
   * Render a form to update an existing company.
   * GET companies/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async edit({ params, request, auth, response }) {}

  /**
   * Update company details.
   * PUT or PATCH companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response, auth }) {
    const data = request.only(["username", "email", "password"]);
    const user = await User.findBy("id", params.id);
    if (auth.user.company_id === user.company_id) {
      user.merge(data);
      user.save();
      return user;
    } else {
      return response.status(401);
    }
  }

  /**
   * Delete a company with id.
   * DELETE companies/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const user = await User.findBy("id", params.id);
    if (auth.user.company_id === user.company_id) {
      user.delete();
      return user;
    } else {
      return response.status(401);
    }
  }
}

module.exports = UserController;
