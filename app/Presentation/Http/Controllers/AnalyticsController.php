<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AnalyticsController
{
    public function index()
    {
        return Inertia::render('Admin/Analytics/index');
    }
}
