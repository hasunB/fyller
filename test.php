<?php
require 'vendor/autoload.php';
$app = require_once 'bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();
$order = App\Domain\Orders\Models\Order::with('order_items')->first();
echo json_encode($order ? $order->toArray() : [], JSON_PRETTY_PRINT);
