<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->as('api.')->middleware('guest')->group(function () {
    Route::post('/register', [RegisterController::class, 'register'])->name('register');
    Route::post('/login', [LoginController::class, 'authenticate'])->name('login');
});

Route::middleware(['auth:sanctum', 'active'])->group(function () {
    Route::get('/me', fn () => request()->user());
    Route::post('/logout', [LoginController::class, 'destroy'])->name('api.logout');
});