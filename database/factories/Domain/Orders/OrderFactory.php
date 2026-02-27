<?php

namespace Database\Factories\Domain\Orders;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Orders\Models\Order;
use App\Domain\Customers\Models\Customer;
use App\Domain\Inventory\Models\Product;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'order_number' => $this->faker->bothify('ORD-####'),
            'customer_id' => Customer::factory(),
            'payment_status_id' => $this->faker->numberBetween(1, 4),
            'payment_type_id' => $this->faker->numberBetween(1, 4),
            'fulfillment_status_id' => $this->faker->numberBetween(1, 4),
            'product_id' => Product::factory(),
            'quantity' => $this->faker->numberBetween(1, 10),
            'price' => $this->faker->randomFloat(2, 100, 10000),
            'total' => $this->faker->randomFloat(2, 100, 10000),
        ];
    }
}