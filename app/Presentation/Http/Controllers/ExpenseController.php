<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Expenses\Models\Expense;
use App\Domain\Expenses\Models\Category;
use App\Domain\Expenses\Models\Merchant;
use App\Presentation\Requests\Expenses\StoreExpenseRequest;

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
        return Inertia::render('Admin/Expenses/create', [
            'categories' => Category::all(['id', 'name']),
            'merchants' => Merchant::all(['id', 'name']),
        ]);
    }

    public function show(Expense $expense)
    {
        $expense->load('category', 'merchant', 'recurring_rule', 'expense_transactions.expense_status');

        return Inertia::render('Admin/Expenses/view', [
            'expense' => $expense,
        ]);
    }

    public function store(StoreExpenseRequest $request)
    {
        try {
            $validated = $request->validated();

            // Extract only the fields belonging to the expenses table
            $expenseData = collect($validated)->only([
                'name',
                'description',
                'category_id',
                'merchant_id',
                'expire_date',
                'enable_ai_forecast',
                'enable_anomaly_detection',
            ])->toArray();

            $expenseData['expense_number'] = $this->generateExpenseNumber();

            // Create Expense 
            $expense = Expense::create($expenseData);

            if ($request->boolean('is_recurring')) {
                $expense->recurring_rule()->create([
                    'frequency' => $validated['recurring_frequency'],
                    'interval' => $validated['recurring_interval'],
                    'amount' => $validated['recurring_amount'],
                    'start_date' => $validated['recurring_start_date'],
                    'end_date' => $validated['recurring_end_date'] ?? null,
                    'next_run_date' => $validated['recurring_next_run_date'] ?? $validated['recurring_start_date'],
                ]);
            }

            // Create Expense Transaction
            $expense->expense_transactions()->create([
                'transaction_number' => $this->generateTransactionNumber(),
                'expense_id' => $expense->id,
                'amount' => $validated['amount'] ?? $validated['recurring_amount'],
                'transaction_date' => $validated['date'],
                'expense_status_id' => 1,
            ]);
            
            dd('Expense created successfully!');
            // return redirect()->route('expenses.create')->with('success', 'Expense created successfully!');

        } catch (\Throwable $th) {
            throw $th;
        }
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

    private function generateExpenseNumber()
    {
        return 'EXP-' . time();
    }

    private function generateTransactionNumber()
    {
        return 'TR-' . time();
    }
}
