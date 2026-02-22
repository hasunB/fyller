<?php

namespace Database\Factories\Domain\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Inventory\Models\Category;

class CategoryFactory extends Factory
{
    protected $model = Category::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->word,
        ];
    }
}
