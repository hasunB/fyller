<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\Role;
use App\Domain\Employees\Models\Department;

class RoleFactory extends Factory
{
    protected $model = Role::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->jobTitle(),
            'department_id' => Department::inRandomOrder()->first()?->id ?? Department::factory(),
        ];
    }
}
