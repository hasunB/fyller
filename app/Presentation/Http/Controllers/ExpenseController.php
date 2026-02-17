<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ExpenseController
{
    public function index()
    {
        return Inertia::render('Admin/Expenses/index');
    }

    public function create()
    {
        return Inertia::render('Admin/Expenses/create');
    }
}
