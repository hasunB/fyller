<?php

namespace App\Domain\Expenses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ExpenseTransaction extends Model
{
    use HasFactory;

    protected $fillable = [
        'transaction_number',
        'expense_id',
        'amount',
        'transaction_date',
        'expense_status_id',
        'receipt',
        'notes',
    ];

    public function expense()
    {
        return $this->belongsTo(Expense::class);
    }

    public function expense_status()
    {
        return $this->belongsTo(ExpenseStatus::class);
    }
}