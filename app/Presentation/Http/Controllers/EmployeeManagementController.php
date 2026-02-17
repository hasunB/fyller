<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EmployeeManagementController
{
public function index()
    {
        return Inertia::render('Admin/Employee/index');
    }

    public function create()
    {
        return Inertia::render('Admin/Employee/create');
    }
}
