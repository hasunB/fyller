<?php

namespace App\Domain\Employees\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Address extends Model
{
    use HasFactory;

    protected $table = 'employee_addresses';

    protected $fillable = [
        'employee_id',
        'address',
        'city',
        'state',
        'zip',
        'country'
    ];

    public function employee()
    {
        return $this->belongsTo(Employee::class);
    }
}