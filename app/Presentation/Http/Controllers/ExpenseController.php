<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Expenses\Models\Expense;

class ExpenseController
{
    public function index()
    {
        $expenses = Expense::with('category', 'expense_status', 'recurring_rule', 'expense_transactions')
            ->orderBy('created_at', 'desc')
            ->cursorPaginate(10)
            ->withQueryString();

        $total_expenses_this_month = Expense::whereMonth('created_at', date('m'))
            ->withSum('expense_transactions', 'amount')
            ->get()
            ->sum('expense_transactions_sum_amount');

        $total_software_expenses = Expense::whereHas('category', function ($query) {
            $query->where('name', 'Software');
        })->withSum('expense_transactions', 'amount')
            ->get()
            ->sum('expense_transactions_sum_amount');

        $projected_expenses = 1000000;

        return Inertia::render('Admin/Expenses/index', [
            'expenses' => $expenses,
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
