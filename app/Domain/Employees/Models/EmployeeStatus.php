<?php

namespace App\Domain\Employees\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeStatus extends Model
{
    use HasFactory;

    protected $table = 'employee_status';

    protected $fillable = [
        'name'
    ];

    public function logs()
    {
        return $this->hasMany(EmployeeStatusLog::class);
    }
}