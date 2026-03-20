<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\Permission;
use App\Domain\Employees\Models\Employee;

class PermissionFactory extends Factory
{
    protected $model = Permission::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()?->id ?? Employee::factory(),
            'permission_id' => Permission::inRandomOrder()->first()?->id ?? Permission::factory(),
        ];
    }
}
