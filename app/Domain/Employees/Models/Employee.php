<?php

namespace App\Domain\Employees\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Employee extends Model
{
    use HasFactory;

    protected $table = 'employees';

    protected $fillable = [
        'employee_number',
        'first_name',
        'last_name',
        'email',
        'phone',
        'department_id',
        'hire_date'
    ];

    protected $appends = ['productivityScore', 'lastActive', 'avatar', 'fullName'];

    protected $casts = [
        'hire_date' => 'date'
    ];

    // Many-to-many Roles
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'employee_roles');
    }

    // Direct permission override
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'employee_permissions');
    }

    // Status logs
    public function statusLogs()
    {
        return $this->hasMany(EmployeeStatusLog::class);
    }

    // Latest status
    public function currentStatus()
    {
        return $this->hasOne(EmployeeStatusLog::class)->latestOfMany();
    }

    public function addresses()
    {
        return $this->hasMany(Address::class);
    }

    //logics
    public function getProductivityScoreAttribute()
    {
        return rand(0, 100);
    }

    public function getLastActiveAttribute()
    {
        $lastActive = $this->statusLogs()->latest()->first();
        return $lastActive ? $lastActive->created_at->diffForHumans() : 'Never';
    }

    public function getAvatarAttribute()
    {
        return $this->first_name[0] . $this->last_name[0];
    }

    public function getFullNameAttribute()
    {
        return $this->first_name . ' ' . $this->last_name;
    }
}