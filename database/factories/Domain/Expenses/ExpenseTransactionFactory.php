<?php

namespace Database\Factories\Domain\Expenses;

use App\Domain\Expenses\Models\Expense;
use App\Domain\Expenses\Models\ExpenseStatus;
use App\Domain\Expenses\Models\ExpenseTransaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class ExpenseTransactionFactory extends Factory
{
    protected $model = ExpenseTransaction::class;

    public function definition(): array
    {
        return [
            'expense_id' => Expense::factory(),
            'amount' => $this->faker->randomFloat(2, 10, 500),
            'transaction_date' => $this->faker->date(),
            'expense_status_id' => $this->faker->numberBetween(1, 11),
            'receipt' => $this->faker->imageUrl,
            'notes' => $this->faker->sentence(),
        ];
    }
}