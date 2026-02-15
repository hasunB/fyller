<?php

use App\Presentation\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Presentation\Http\Controllers\RegisteredUserController;
use App\Presentation\Http\Controllers\InventoryController;

Route::get('/', function () {
    return Inertia::render('Home', []);
});

//auth
//login
Route::get('/login', [SessionController::class, 'create'])->name('login');
Route::post('/login', [SessionController::class, 'store']);
Route::post('/logout', [SessionController::class, 'destroy']);

//register
Route::get('/register', [RegisteredUserController::class, 'create']);
Route::post('/register', [RegisteredUserController::class, 'store']);

Route::get('/dashboard', function () {
    return Inertia::render('Admin/Dashboard', []);
})->middleware('auth');

Route::get('/inventory', [InventoryController::class, 'create'])->middleware('auth');
