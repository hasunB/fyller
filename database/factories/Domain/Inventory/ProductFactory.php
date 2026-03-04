<?php

namespace Database\Factories\Domain\Inventory;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Inventory\Models\Product;
use App\Domain\Inventory\Models\Category;

class ProductFactory extends Factory
{
    protected $model = Product::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->words(3, true),
            'sku' => $this->faker->unique()->ean13,
            'category_id' => Category::factory(),
            'price' => $this->faker->randomFloat(2, 10, 1000),
            'cost_price' => $this->faker->randomFloat(2, 10, 1000),
            'stock' => $this->faker->numberBetween(0, 1000),
            'safety_stock' => $this->faker->numberBetween(0, 100),
            'description' => $this->faker->text,
            'weight' => $this->faker->randomFloat(2, 1, 100),
            'enable_ai_forecast' => $this->faker->boolean,
            'enable_smart_reorder' => $this->faker->boolean,
            'image' => $this->faker->imageUrl,
        ];
    }
}
