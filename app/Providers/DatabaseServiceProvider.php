<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class DatabaseServiceProvider extends ServiceProvider
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
            database_path('migrations/admission'),
            database_path('migrations/enrollment'),
            database_path('migrations/clinic'),
        ]);
    }
}
