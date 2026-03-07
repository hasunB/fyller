<?php

namespace App\Domain\Expenses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Expenses\Models\Expense;

class ExpenseStatus extends Model
{
    use HasFactory;

    protected $table = 'expense_status';

    public function expense_transactions()
    {
        return $this->hasMany(ExpenseTransaction::class);
    }
}