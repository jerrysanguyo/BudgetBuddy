<?php

use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Auth\LoginController;
use Illuminate\Support\Facades\Route;

Route::prefix('auth')->group(function () {
    Route::post('/register', [RegisterController::class, 'register'])
        ->middleware('guest')
        ->name('api.register');
    Route::post('/login', [LoginController::class, 'authenticate'])
        ->middleware('guest')
        ->name('api.login');
    
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [LoginController::class, 'destroy'])
            ->name('api.logout');
    });
});

Route::middleware('auth:sanctum')->get('/me', fn () => auth()->user());