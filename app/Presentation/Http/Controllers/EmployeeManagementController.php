<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Employees\Models\Employee;
use App\Domain\Employees\Models\Permission;
use App\Domain\Employees\Models\Department;
use App\Domain\Employees\Models\Role;
use App\Presentation\Requests\Employees\StoreEmployeeRequest;
use App\Domain\Employees\Models\EmployeeRole;
use App\Domain\Employees\Models\EmployeeStatusLog;
use App\Domain\Employees\Models\EmployeePermission;

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
        return Inertia::render('Admin/Employee/create', [
            'permissions' => Permission::all(['id', 'name']),
            'departments' => Department::all(['id', 'name']),
            'roles' => Role::all(['id', 'name', 'department_id']),
        ]);
    }

    public function show(Employee $employee)
    {
        $employee->load('roles', 'roles.department', 'currentStatus', 'currentStatus.status');

        return Inertia::render('Admin/Employee/view', [
            'employee' => $employee,
        ]);
    }

    public function store(StoreEmployeeRequest $request)
    {
        // If the code wasn't reaching the dd("Done") at the bottom, 
        // it means validation was failing and redirecting back. 
        // Let's dump the request data or the validation errors here to debug!
        $validated = $request->validated();

        // Extract only the fields belonging to the expenses table
        $employeeData = collect($validated)->only([
            'first_name',
            'last_name',
            'email',
            'phone',
            'hire_date',
            'password',
            'enable_ai_forecast',
            'enable_anomaly_detection',
        ])->toArray();

        $employeeData['employee_number'] = $this->generateEmployeeNumber();

        // $employee = Employee::create($employeeData);

        // EmployeeRole::create([
        //     'employee_id' => $employee->id,
        //     'role_id' => $validated['role_id'],
        // ]);

        // EmployeeStatusLog::create([
        //     'employee_id' => $employee->id,
        //     'status_id' => 1,
        // ]);

        $truePermissions = collect($validated['permissions'])
            ->filter(fn($v) => filter_var($v, FILTER_VALIDATE_BOOLEAN))
            ->keys()
            ->toArray();

        dd($truePermissions);

        foreach ($truePermissions as $permissionId) {
            // EmployeePermission::create([
            //     'employee_id' => $employee->id,
            //     'permission_id' => $permissionId,
            // ]);
            dd($permissionId);
            //TODO: Got the permission id's now create the employee and the permissions
        }



        dd("Done! Validation passed. Payload:", $validated);
    }

    private function generateEmployeeNumber()
    {
        return 'EMP-' . time();
    }
}
