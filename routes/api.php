<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ProductController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


Route::middleware('auth:sanctum')->group(function() {
  // this route is used to fetch user information
  Route::get('/user', function (Request $request) {
    return $request->user();
  });
  // this route is used to logout user
  Route::post('/logout', [AuthController::class, 'logout']);
  Route::apiResource('/users', UserController::class);
});

Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{type}', [ProductController::class, 'getByType']);
Route::get('/products/name/{name}', [ProductController::class, 'getByName']);
Route::post('/products/add', [ProductController::class, 'store']);
Route::post('/products/addBulk', [ProductController::class, 'storeBulk']);
Route::delete('/products/delete/{id}', [ProductController::class, 'destroy']);

Route::get('/public/images/{imageName}', [ProductController::class, 'getImage'])->where('imageName', '.*');
