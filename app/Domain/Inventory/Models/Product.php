<?php

namespace App\Domain\Inventory\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Product extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $appends = ['status', 'ai_insight', 'last_sync'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    protected function status(): Attribute
    {
        return Attribute::make(
            get: function () {
                if ($this->stock <= 5) return 'Critical';
                if ($this->stock <= $this->safety_stock) return 'Low Stock';
                return 'In Stock';
            }
        );
    }

    protected function aiInsight(): Attribute
    {
        return Attribute::make(
            get: function () {
                $stock = $this->stock ?? 0;
                $safetyStock = $this->safety_stock ?? 0;
                $recentSales = $this->sales_last_30_days ?? 0;

                // 1. Critically Low Stock: Action needed immediately
                if ($stock <= $safetyStock) {
                    return 'Reorder';
                }

                // 2. High Demand: Items are flying off the shelves
                // (e.g., You've sold more in the last 30 days than you currently have in stock)
                if ($recentSales > 0 && $recentSales >= $stock) {
                    return 'High Demand';
                }

                // 3. Overstocked / Dead Stock: Lots of inventory, but it's not moving
                // (e.g., More than 100 in stock, but sold less than 5 recently)
                if ($stock > 700 && $recentSales < 5) {
                    return 'Overstocked';
                }

                // 4. Slow-moving stock: You have stock, but it's selling very slowly
                // (e.g., Stock is over 50, and you sold less than 15% of your total stock recently)
                if ($stock > 50 && $recentSales <= ($stock * 0.15)) {
                    return 'Slow Mover';
                }

                // 5. Healthy Inventory
                return 'Stable';
            }
        );
    }

    protected function lastSync(): Attribute
    {
        return Attribute::make(
            get: fn() => $this->updated_at->diffForHumans()
        );
    }
}
