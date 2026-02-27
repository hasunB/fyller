<?php

namespace App\Domain\Orders\Models;

use App\Domain\Inventory\Models\Product;
use App\Domain\Customers\Models\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\FulfillmentStatus;
use App\Domain\Orders\Models\PaymentStatus;
use App\Domain\Orders\Models\PaymentType;

class Order extends Model
{
    use HasFactory;

    protected $table = 'orders';

    protected $fillable = [
        'order_number',
        'customer_id',
        'order_date',
        'total_amount',
        'status',
    ];

    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function products()
    {
        return $this->hasMany(Product::class);
    }

    public function fulfillment_status()
    {
        return $this->belongsTo(FulfillmentStatus::class);
    }

    public function payment_status()
    {
        return $this->belongsTo(PaymentStatus::class);
    }

    public function payment_type()
    {
        return $this->belongsTo(PaymentType::class);
    }
}
