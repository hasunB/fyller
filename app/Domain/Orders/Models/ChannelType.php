<?php

namespace App\Domain\Orders\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Domain\Orders\Models\Order;

class ChannelType extends Model
{
    use HasFactory;

    protected $table = 'channel_types';

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}