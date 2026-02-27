<?php

namespace App\Domain\Orders\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\Order;

class PaymentStatus extends Model
{
    use HasFactory;

    protected $table = 'payment_status';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}