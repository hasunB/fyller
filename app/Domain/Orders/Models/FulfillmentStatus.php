<?php

namespace App\Domain\Orders\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\Order;

class FulfillmentStatus extends Model
{
    use HasFactory;

    protected $table = 'fulfillment_status';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}