<?php

namespace App\Presentation\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Domain\Orders\Models\Order;
use App\Domain\Orders\Models\OrderItem;

class OrderController extends Controller
{
    public function index()
    {
        $orders = Order::with('channel_type', 'customer', 'payment_type', 'fulfillment_status', 'payment_status', 'order_items')
            ->orderBy('created_at', 'desc')
            ->cursorPaginate(15)
            ->withQueryString();

        $total_orders = Order::whereDate('created_at', today())->count();
        $total_revenue = $this->calculateTotalRevenue();
        $return_rate = $this->calculateReturnRate();

        $total_pending_orders = Order::whereHas('fulfillment_status',  function ($query) {
            $query->where('name', 'Processing');
        })->count();

        $total_delivered_orders = Order::whereHas('fulfillment_status', function ($query) {
            $query->where('name', 'Delivered');
        })->count();

        $total_failed_orders = Order::whereHas('fulfillment_status', function ($query) {
            $query->where('name', 'Failed');
        })->count();

        return Inertia::render('Admin/Orders/index', [
            'orders' => $orders,
            'total_orders' => $total_orders,
            'total_revenue' => $total_revenue,
            'total_pending_orders' => $total_pending_orders,
            'total_delivered_orders' => $total_delivered_orders,
            'total_failed_orders' => $total_failed_orders,
            'return_rate' => $return_rate,
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Orders/create');
    }

    public function show(Order $order)
    {
        $order->load(['channel_type', 'customer', 'payment_type', 'fulfillment_status', 'payment_status', 'order_items.product']);

        $customer_orders = Order::where('customer_id', $order->customer_id)->get();
        $order->customer->orders_count = $customer_orders->count();
        $order->customer->lifetime_value = '$ ' . number_format($customer_orders->sum('total_amount'), 2);

        return Inertia::render('Admin/Orders/order', [
            'order' => $order,
        ]);
    }

    public function calculateTotalRevenue()
    {
        $total_revenue = OrderItem::sum('total');

        if ($total_revenue >= 1000000) {
            $formatted = round($total_revenue / 1000000, 1) . 'M';
        } elseif ($total_revenue >= 1000) {
            $formatted = round($total_revenue / 1000, 1) . 'K';
        } else {
            $formatted = (string) round($total_revenue, 2);
        }

        return $formatted;
    }

    public function calculateReturnRate()
    {
        $total_orders = Order::count();
        $total_returned_orders = Order::whereHas('fulfillment_status', function ($query) {
            $query->where('name', 'Returned');
        })->count();

        $return_rate = ($total_returned_orders / $total_orders) * 100;

        return round($return_rate, 2) . '%';
    }
}
