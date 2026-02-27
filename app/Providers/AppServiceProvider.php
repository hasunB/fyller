<?php

namespace App\Providers;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\ServiceProvider;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

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
        // Model::shouldBeStrict(! $this->app->isProduction());

        // Enforce morph map to avoid storing class names in DB
        // Relation::enforceMorphMap([...]);
        Factory::guessFactoryNamesUsing(function (string $modelName) {
            if (str_starts_with($modelName, 'App\\Domain\\')) {
                return Str::of($modelName)
                    ->replaceFirst('App\\Domain\\', 'Database\\Factories\\Domain\\')
                    ->replace('\\Models\\', '\\')
                    ->append('Factory')
                    ->toString();
            }

            return 'Database\\Factories\\' . class_basename($modelName) . 'Factory';
        });
    }
}
