<?php

namespace Database\Factories\Domain\Orders;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Domain\Orders\Models\Order;
use App\Domain\Customers\Models\Customer;

class OrderFactory extends Factory
{
    protected $model = Order::class;

    public function definition(): array
    {
        return [
            'order_number' => $this->faker->bothify('ORD-####'),
            'channel_type_id' => $this->faker->numberBetween(1, 3),
            'customer_id' => Customer::factory(),
            'payment_status_id' => $this->faker->numberBetween(1, 4),
            'payment_type_id' => $this->faker->numberBetween(1, 4),
            'fulfillment_status_id' => $this->faker->numberBetween(1, 6),
        ];
    }
}
