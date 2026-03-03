<?php

namespace Database\Seeders;

use App\Domain\Customers\Models\Customer;
use App\Domain\User\Models\User;
use App\Domain\Inventory\Models\Category;
use App\Domain\Inventory\Models\Product;
use App\Domain\Orders\Models\Order;
use App\Domain\Orders\Models\OrderItem;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => 'password',
        ]);

        Category::factory(10)->create();
        Product::factory(100)->create();

        $types = [
            ['name' => 'Individual'],
            ['name' => 'Business'],
            ['name' => 'Non-Profit'],
            ['name' => 'Government'],
        ];
        foreach ($types as $type) {
            DB::table('customer_type')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        $statuses = [
            ['name' => 'Active'],
            ['name' => 'Inactive'],
            ['name' => 'Suspended'],
            ['name' => 'Pending'],
        ];
        foreach ($statuses as $status) {
            DB::table('customer_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $paymentStatuses = [
            ['name' => 'Pending'],
            ['name' => 'Paid'],
            ['name' => 'Failed'],
            ['name' => 'Refunded']
        ];
        foreach ($paymentStatuses as $status) {
            DB::table('payment_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $paymentTypes = [
            ['name' => 'Credit Card'],
            ['name' => 'PayPal'],
            ['name' => 'Bank Transfer'],
            ['name' => 'Cash']
        ];
        foreach ($paymentTypes as $type) {
            DB::table('payment_type')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        $fulfillmentStatuses = [
            ['name' => 'Unfulfilled'],
            ['name' => 'Processing'],
            ['name' => 'Shipped'],
            ['name' => 'Delivered'],
            ['name' => 'Returned'],
            ['name' => 'Cancelled']
        ];
        foreach ($fulfillmentStatuses as $status) {
            DB::table('fulfillment_status')->insert(array_merge($status, ['created_at' => now(), 'updated_at' => now()]));
        }

        $channelTypes = [
            ['name' => 'Web'],
            ['name' => 'Mobile'],
            ['name' => 'POS']
        ];
        foreach ($channelTypes as $type) {
            DB::table('channel_types')->insert(array_merge($type, ['created_at' => now(), 'updated_at' => now()]));
        }

        Customer::factory(10)->create();
        Order::factory(30)->create();
        OrderItem::factory(50)->create();
    }
}
