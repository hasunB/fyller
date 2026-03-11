<?php

namespace Database\Factories\Domain\Expenses;

use App\Domain\Expenses\Models\Expense;
use App\Domain\Expenses\Models\ExpenseRecurringRule;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseRecurringRuleFactory extends Factory
{
    protected $model = ExpenseRecurringRule::class;

    public function definition(): array
    {
        $start = $this->faker->dateTimeBetween('-6 months', 'now');

        return [
            'expense_id' => Expense::factory(),
            'frequency' => $this->faker->randomElement(['weekly', 'monthly', 'yearly']),
            'interval' => $this->faker->numberBetween(1, 3),
            'amount' => $this->faker->numberBetween(100, 1000),
            'start_date' => $start,
            'end_date' => null,
            'next_run_date' => now()->addMonth(),
            'is_active' => true,
        ];
    }
}
