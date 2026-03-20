<?php

namespace App\Domain\Employees\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class EmployeeStatusLog extends Model
{
    use HasFactory;

    protected $table = 'employee_status_logs';

    protected $fillable = [
        'employee_id',
        'status_id'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }

    public function status()
    {
        return $this->belongsTo(EmployeeStatus::class);
    }
}