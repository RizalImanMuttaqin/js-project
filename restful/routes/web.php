<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/laravel', function () use ($router) {
    return response()->json(['APP' => 'laravel/lumen']);
});

$router->get('/laravel/secret', function () use ($router) {
    return response()->json(['msg' => 'this must be protected']);
});

$router->get('/laravel/public', function () use ($router) {
    return response()->json(['msg' => 'anyone can access this']);
});
