<?php

use App\Http\Controllers\API\ThoughtsController;
use App\Http\Controllers\API\TodoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::post('/addtask', [TodoController::class, 'create']);
Route::get('/edittask/{id}', [TodoController::class, 'edit']);
Route::put('/updatetask/{id}', [TodoController::class, 'update']);
Route::delete('/deletetask/{id}', [TodoController::class, 'destroy']);
Route::get('tasks', [TodoController::class, 'index']);

Route::post('/addthoughts', [ThoughtsController::class, 'create']);
Route::get('/edithoughts/{id}', [ThoughtsController::class, 'edit']);
Route::put('/updatethoughts/{id}', [ThoughtsController::class, 'update']);
Route::delete('/deletetask/{id}', [ThoughtsController::class, 'destroy']);
Route::get('thoughts', [ThoughtsController::class, 'index']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
