<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Employees\Models\Employee;

class EmployeeManagementController
{
    public function index()
    {
        $employees = Employee::with('roles', 'roles.department', 'currentStatus', 'currentStatus.status')
            ->orderBy('created_at', 'desc')
            ->cursorPaginate(15)
            ->withQueryString();

        $total_employees = Employee::count();
        // $total_active_employees = Employee::where('status', 'active')->count();
        // $avg_ai_score = Employee::avg('productivity_score');        
        $total_active_employees = 0;
        $avg_ai_score = 0;

        return Inertia::render('Admin/Employee/index', [
            'employees' => $employees,
            'total_employees' => $total_employees,
            'total_active_employees' => $total_active_employees,
            'avg_ai_score' => $avg_ai_score,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Employee/create');
    }
}
