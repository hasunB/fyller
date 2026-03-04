<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Expenses\Models\Expense;

class ExpenseController
{
    public function index()
    {
        $expenses = Expense::with('category', 'expense_status')
            ->orderBy('created_at', 'desc')
            ->cursorPaginate(15)
            ->withQueryString();

        $total_expenses = Expense::sum('amount');
        $total_expenses_this_month = Expense::whereMonth('created_at', date('m'))->sum('amount');
        $total_software_expenses = Expense::whereHas('category', function ($query) {
            $query->where('name', 'Software');
        })->sum('amount');
        $projected_expenses = $total_expenses_this_month * 12;

        return Inertia::render('Admin/Expenses/index', [
            'expenses' => $expenses,
            'total_expenses' => $total_expenses,
            'total_expenses_this_month' => $total_expenses_this_month,
            'total_software_expenses' => $total_software_expenses,
            'projected_expenses' => $projected_expenses,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Expenses/create');
    }
}
