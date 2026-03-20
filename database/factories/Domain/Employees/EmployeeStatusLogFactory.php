<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\EmployeeStatusLog;
use App\Domain\Employees\Models\Employee;
use App\Domain\Employees\Models\EmployeeStatus;

class EmployeeStatusLogFactory extends Factory
{
    protected $model = EmployeeStatusLog::class;

    public function definition(): array
    {
        return [
            'employee_id' => Employee::inRandomOrder()->first()?->id ?? Employee::factory(),
            'status_id' => EmployeeStatus::inRandomOrder()->first()?->id ?? EmployeeStatus::factory(),
        ];
    }
}
