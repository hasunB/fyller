<?php

namespace App\Domain\Expenses\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Merchant extends Model
{
    use HasFactory;

    protected $table = 'merchants';

    protected $fillable = [
        'name',
    ];

    public function expenses()
    {
        return $this->hasMany(Expense::class);
    }
}