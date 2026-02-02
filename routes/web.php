<?php

use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware('guest')->group(function () {
    Route::get('/', fn () => Inertia::render('Landing'))->name('landing');
    Route::get('/login', [LoginController::class, 'login'])->name('login');
    Route::get('/register', [RegisterController::class, 'registerForm'])->name('register');
});