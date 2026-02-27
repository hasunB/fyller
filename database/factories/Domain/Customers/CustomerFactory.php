<?php

namespace Database\Factories\Domain\Customers;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Customers\Models\Customer;

class CustomerFactory extends Factory
{
    protected $model = Customer::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'email' => $this->faker->email,
            'phone' => $this->faker->phoneNumber,
            'address' => $this->faker->address,
            'customer_type_id' => $this->faker->numberBetween(1, 4),
            'customer_status_id' => $this->faker->numberBetween(1, 4),
        ];
    }
}
