<?php

namespace App\Domain\Orders\Models;

use App\Domain\Customers\Models\Customer;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\FulfillmentStatus;
use App\Domain\Orders\Models\PaymentStatus;
use App\Domain\Orders\Models\PaymentType;
use Illuminate\Database\Eloquent\Casts\Attribute;

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

    protected $appends = ['last_sync', 'ai_priority', 'total_amount'];

    // relations
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    public function order_items()
    {
        return $this->hasMany(OrderItem::class);
    }

    public function channel_type()
    {
        return $this->belongsTo(ChannelType::class);
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

    // appends
    protected function lastSync(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->updated_at->diffForHumans()
        );
    }

    protected function aiPriority(): Attribute
    {
        return Attribute::make(
            get: fn() => match (true) {
                $this->order_items()->sum('total') > 9000 => 'Fraud Risk',
                $this->order_items()->sum('total') > 4000 => 'High',
                default => 'Normal',
            }
        );
    }

    protected function totalAmount(): Attribute
    {
        return Attribute::make(
            get: function () {
                // Sums up the 'total' column from the related orderItems
                return $this->order_items()->sum('total');
            }
        );
    }
}
