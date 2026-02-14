<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Crash the app locally if we do lazy loading or unfillable attributes
        Model::shouldBeStrict(! $this->app->isProduction());

        // Enforce morph map to avoid storing class names in DB
        // Relation::enforceMorphMap([...]);
    }
}
