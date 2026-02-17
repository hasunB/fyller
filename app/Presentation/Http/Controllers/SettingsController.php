<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController
{
    public function index()
    {
        return Inertia::render('Admin/Settings/index');
    }
}
