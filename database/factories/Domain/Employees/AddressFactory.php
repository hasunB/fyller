<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\Address;
use App\Domain\Employees\Models\Employee;

class AddressFactory extends Factory
{
    protected $model = Address::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()?->id ?? Employee::factory(),
            'address' => $this->faker->address(),
            'city' => $this->faker->city(),
            'state' => $this->faker->state(),
            'zip' => $this->faker->postcode(),
            'country' => $this->faker->country(),
        ];
    }
}
