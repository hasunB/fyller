<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Expenses\Models\Expense;

class ExpenseController
{
    public function index()
    {
        $expenses = Expense::with('category', 'recurring_rule', 'expense_transactions.expense_status')
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

        $AI_flagged_count = Expense::whereHas('expense_transactions', function ($query) {
            $query->where('expense_status_id', 11);
        })->count();

        $projected_expenses = $this->calculateProjectedExpenses();

        return Inertia::render('Admin/Expenses/index', [
            'expenses' => $expenses,
            'total_expenses_this_month' => $total_expenses_this_month,
            'total_software_expenses' => $total_software_expenses,
            'projected_expenses' => $projected_expenses,
            'AI_flagged_count' => $AI_flagged_count,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Expenses/create');
    }

    public function show(Expense $expense)
    {
        $expense->load('category', 'merchant', 'recurring_rule', 'expense_transactions.expense_status');

        return Inertia::render('Admin/Expenses/view', [
            'expense' => $expense,
        ]);
    }

    //logics
    public function calculateProjectedExpenses()
    {
        $startDate = now()->startOfMonth();
        $today = now();

        $expenses = Expense::whereBetween('created_at', [$startDate, $today->endOfDay()])
            ->withSum('expense_transactions', 'amount')
            ->get();

        $totalExpensesSoFar = $expenses->sum('expense_transactions_sum_amount');
        $daysPassed = $today->day;
        $daysInMonth = $today->daysInMonth;

        $averagePerDay = $daysPassed > 0 ? $totalExpensesSoFar / $daysPassed : 0;
        $projectedTotal = $averagePerDay * $daysInMonth;

        return $projectedTotal;
    }
}
