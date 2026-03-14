<?php

namespace App\Domain\Expenses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseRecurringRule extends Model
{
    use HasFactory;

    protected $fillable = [
        'expense_id',
        'frequency',
        'interval',
        'amount',
        'start_date',
        'end_date',
        'next_run_date',
        'is_active',
    ];

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }
}