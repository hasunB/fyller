<?php

namespace App\Domain\Expenses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Expense extends Model
{
    use HasFactory;

    protected $table = 'expenses';

    protected $guarded = [];

    protected $appends = ['last_sync', 'subtotal_amount', 'is_recurring', 'receipt'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function recurring_rule()
    {
        return $this->hasOne(ExpenseRecurringRule::class);
    }

    public function expense_transactions()
    {
        return $this->hasMany(ExpenseTransaction::class);
    }

    protected function lastSync(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->updated_at->diffForHumans()
        );
    }

    protected function subtotalAmount(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->expense_transactions()->sum('amount')
        );
    }

    protected function isRecurring(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->recurring_rule()->exists()
        );
    }

    protected function receipt(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->expense_transactions()->whereNotNull('receipt')->exists()
        );
    }
}
