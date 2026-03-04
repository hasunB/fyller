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

    protected $appends = ['last_sync'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function expense_status()
    {
        return $this->belongsTo(ExpenseStatus::class);
    }

    protected function lastSync(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->updated_at->diffForHumans()
        );
    }
}
