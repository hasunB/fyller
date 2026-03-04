<?php

namespace Database\Factories\Domain\Expenses;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Expenses\Models\Category;

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
