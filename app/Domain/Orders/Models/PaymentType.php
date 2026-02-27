<?php

namespace App\Domain\Orders\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\Order;

class PaymentType extends Model
{
    use HasFactory;

    protected $table = 'payment_type';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}