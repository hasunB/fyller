<?php

namespace App\Domain\Employees\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeRole extends Model
{
    use HasFactory;

    protected $table = 'employee_roles';

    protected $fillable = [
        'employee_id',
        'role_id'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function role()
    {
        return $this->belongsTo(Role::class);
    }
}
