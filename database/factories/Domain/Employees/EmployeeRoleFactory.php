<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\EmployeeRole;
use App\Domain\Employees\Models\Employee;
use App\Domain\Employees\Models\Role;

class EmployeeRoleFactory extends Factory
{
    protected $model = EmployeeRole::class;
    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()?->id ?? Employee::factory(),
            'role_id' => Role::inRandomOrder()->first()?->id ?? Role::factory(),
        ];
    }
}
