'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.resource('api/imagen', 'ImageneController').apiOnly();
Route.resource('api/imagen/:id', 'ImageneController').apiOnly();
Route.resource('api/users', 'UserController').apiOnly();
Route.resource('api/users/:id', 'UserController').apiOnly();
Route.resource('api/mg', 'MegustaController').apiOnly();
Route.put('api/users/follow_me/:id', 'UserController.followMe');
Route.post('api/login','UserController.login');