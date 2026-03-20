<?php

namespace Database\Factories\Domain\Employees;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Employees\Models\Role;
use App\Domain\Employees\Models\Permission;
use App\Domain\Employees\Models\RolePermission;

class RolePermissionFactory extends Factory
{
    protected $model = RolePermission::class;

    public function definition(): array
    {
        return [
            'role_id' => Role::inRandomOrder()->first()?->id ?? Role::factory(),
            'permission_id' => Permission::inRandomOrder()->first()?->id ?? Permission::factory(),
        ];
    }
}
