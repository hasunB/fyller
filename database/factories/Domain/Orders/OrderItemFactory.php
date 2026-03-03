<?php

namespace Database\Factories\Domain\Orders;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Orders\Models\OrderItem;
use App\Domain\Orders\Models\Order;
use App\Domain\Inventory\Models\Product;

class OrderItemFactory extends Factory
{
    protected $model = OrderItem::class;

    public function definition(): array
    {
        return [
            'order_id' => Order::factory(),
            'product_id' => Product::factory(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->numberBetween(10, 1000),
            'total' => $this->faker->numberBetween(10, 10000),
        ];
    }
}