<?php

namespace Database\Factories\Domain\Expenses;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Expenses\Models\Expense;
use App\Domain\Expenses\Models\Category;
use App\Domain\Expenses\Models\ExpenseStatus;

class ExpenseFactory extends Factory
{
    protected $model = Expense::class;

    public function definition(): array
    {
        return [
            'expense_number' => 'EXP-' . $this->faker->unique()->numberBetween(1000, 9999),
            'name' => $this->faker->words(3, true),
            'description' => $this->faker->sentence(),
            'category_id' => Category::inRandomOrder()->first()?->id ?? Category::factory(),
            'merchant_id' => $this->faker->numberBetween(1, 9),
            'enable_ai_forecast' => $this->faker->boolean(),
            'enable_anomaly_detection' => $this->faker->boolean(),
            'expire_date' => $this->faker->date(),
        ];
    }
}
