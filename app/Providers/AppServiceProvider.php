<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }
    
    public function boot(): void
    {
        $this->loadMigrationsFrom([
            database_path('migrations/cms'),
            database_path('migrations/auth'),
            database_path('migrations/transaction'),
        ]);
    }
}
