<?php

use App\Presentation\Http\Controllers\SessionController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Presentation\Http\Controllers\RegisteredUserController;
use App\Presentation\Http\Controllers\InventoryController;
use App\Presentation\Http\Controllers\OrderController;
use App\Presentation\Http\Controllers\ExpenseController;
use App\Presentation\Http\Controllers\EmployeeManagementController;
use App\Presentation\Http\Controllers\AnalyticsController;
use App\Presentation\Http\Controllers\SettingsController;

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

// inventory
Route::get('/inventory', [InventoryController::class, 'index'])->middleware('auth');
Route::get('/inventory/create', [InventoryController::class, 'create'])->middleware('auth');

// orders
Route::get('/orders', [OrderController::class, 'index'])->middleware('auth');
Route::get('/orders/create', [OrderController::class, 'create'])->middleware('auth');

// expenses
Route::get('/expenses', [ExpenseController::class, 'index'])->middleware('auth');
Route::get('/expenses/create', [ExpenseController::class, 'create'])->middleware('auth');

// employees
Route::get('/employees', [EmployeeManagementController::class, 'index'])->middleware('auth');
Route::get('/employees/create', [EmployeeManagementController::class, 'create'])->middleware('auth');

// analytics
Route::get('/analytics', [AnalyticsController::class, 'index'])->middleware('auth');

// settings
Route::get('/settings', [SettingsController::class, 'index'])->middleware('auth');


